// 批处理
function Batcher () {
  this.reset();
}

Batcher.prototype = {
  constructor: Batcher,
  reset () {
    this.has = {};
    this.queue = [];
    this.waiting = false;
  },
  flush () { // 执行并清空队列
    this.queue.forEach(job => {
      job.cb();
    });
    this.reset();
  },
  push (job) {
    const id = job.id;
    if (!this.has[id]) {
      this.has[id] = true;
      this.queue.push(job);
      if (!this.waiting) {
        this.waiting = true;
        if ('Promise' in window) {
          Promise.resolve().then(() => {
            this.flush();
          });
        } else {
          setTimeout(() => { this.flush(); }, 0);
        }
      }
    }
  }
}