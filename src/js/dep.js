function Dep () {
  this.subs = [];
}

Dep.prototype = {
  constructor: Dep,
  addSub (sub) { // sub 即 watch 对象(Dep.target)
    this.subs.push(sub);
  },
  notify () {
    this.subs.forEach(sub => {
      sub.update(); // 调用更新操作
    });
  }
}