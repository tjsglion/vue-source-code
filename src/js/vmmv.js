function Vue (options) {
  this.data = options.data;
  const data = this.data;
  observer(this, data); // 将data属性绑定至Vue实例中
  const id = options.el;
  const frag = new Compile(this, document.getElementById(id));
  document.getElementById(id).appendChild(frag);
}
