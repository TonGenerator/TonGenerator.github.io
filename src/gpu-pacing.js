export const sleep = milliseconds => new Promise(resolve => setTimeout(resolve, milliseconds));
export function gpuPauseMs(activeMs, dutyCycle) {
  if (!Number.isFinite(activeMs) || activeMs < 0 || !Number.isFinite(dutyCycle) || dutyCycle < 0.05 || dutyCycle > 1) throw new Error('Invalid GPU pacing');
  return Math.max(0, activeMs / dutyCycle - activeMs);
}

// One command at a time, with accumulated real idle periods. Soft duty cycle,
// not a hardware utilization or temperature limit.
export function createGpuPacer({dutyCycle = 0.2, shouldStop = () => false, shouldPause = () => false, shouldIgnoreBudget = () => false, onBudgetExceeded, now = () => performance.now(), wait = sleep} = {}) {
  let duty = dutyCycle, idleDebt = 0;
  gpuPauseMs(0, duty);
  return {
    setDuty(value) { gpuPauseMs(0, value); duty = value; idleDebt = 0; },
    get duty() { return duty; },
    async run(work) {
      while (shouldPause() && !shouldStop()) await wait(100);
      if (shouldStop()) throw new Error('GPU cancelled');
      const started = now();
      await work();
      const activeMs = Math.max(0, now() - started);
      if (shouldStop()) throw new Error('GPU cancelled');
      if (activeMs > 100 && !shouldIgnoreBudget()) {
        if (!onBudgetExceeded) throw new Error('GPU work packet exceeded the responsiveness budget');
        await onBudgetExceeded(activeMs);
        if (shouldStop()) throw new Error('GPU cancelled');
      }
      // Browsers clamp nested short timers to ~4 ms. Carry fractional pauses
      // across completed packets instead of turning every 0.2 ms gap into 4 ms.
      // queue.onSubmittedWorkDone still yields after each GPU packet.
      idleDebt += gpuPauseMs(activeMs, duty);
      const pauseMs = idleDebt >= 4 ? Math.floor(idleDebt) : 0;
      idleDebt -= pauseMs;
      // Short waits let cancellation be observed even during low duty cycles.
      for (let left = pauseMs; left > 0 && !shouldStop(); left -= 25) await wait(Math.min(left, 25));
      if (shouldStop()) throw new Error('GPU cancelled');
      return {activeMs, pauseMs};
    },
  };
}
