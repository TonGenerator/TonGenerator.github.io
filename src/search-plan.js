// The CPU thread setting is a total budget, including GPU seed checking.
export const desktopSearchThreadLimit=(total,checkers)=>Math.max(0,total-checkers);
export function createSearchPlan(mode, threads, performanceMode='adaptive') {
  if (!['cpu', 'gpu', 'hybrid'].includes(mode) || !Number.isInteger(threads) || threads < 1 || threads > 256) throw new Error('Invalid search plan');
  if (mode === 'hybrid' && threads < 2) throw new Error('Hybrid search needs at least two CPU threads');
  const checkerCount = mode === 'gpu' ? Math.min(32, threads) : mode === 'hybrid' ? Math.min(32,performanceMode==='max'?threads-1:Math.max(1,Math.floor(threads/2))) : 0;
  const cpuCount = mode === 'cpu' ? threads : mode === 'hybrid' ? threads - checkerCount : 0;
  return { cpuCount, checkerCount, gpuLane: checkerCount ? cpuCount : null, laneCount: cpuCount + Number(checkerCount > 0) };
}
