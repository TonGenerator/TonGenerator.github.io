class OwnCpuMeter {
  constructor(){this.at=null;this.previous=new Map();}
  sample(metrics,now,logicalThreads){
    const elapsed=this.at===null?0:(now-this.at)/1000,next=new Map();let seconds=0;
    for(const metric of metrics){
      const value=metric.cpu?.cumulativeCPUUsage;
      if(!Number.isFinite(value)||value<0)continue;
      const key=metric.pid+':'+metric.creationTime,previous=this.previous.get(key);next.set(key,value);
      if(previous!==undefined&&value>=previous)seconds+=value-previous;
    }
    this.previous=next;this.at=now;
    // CPU seconds / wall seconds / logical CPUs matches the system-wide fraction.
    // Missing counters conservatively count as external load instead of claiming free capacity.
    return elapsed>0?Math.max(0,Math.min(1,seconds/elapsed/Math.max(1,logicalThreads))):0;
  }
}
module.exports={OwnCpuMeter};
