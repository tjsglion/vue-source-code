let uid = 0;
function Watcher (vm, node, name, type) {
  Dep.target = this;
  this.vm = vm;
  this.node = node;
  this.id = ++uid;
  this.name = name;
  this.type = type;
  // TODO
  this.update();
  Dep.target = null;
}

Watcher.prototype = {
  // 获取属性对应的值
  get () {
    return this.vm[this.name];
    // this.value = this.vm[this.name];
  },
  cb () { // 回调， 交由任务队列的宏任务执行， 只处理一次
    // this.node[this.type] = this.value;
    this.node[this.type] = this.get();
  },
  update () {
    this.get();
    if (!batcher) {
      batcher = new Batcher();
    }
    batcher.push(this);
  }
};