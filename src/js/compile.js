function Compile (vm, node) {
  if (node) {
    this.$frag = this.nodeToFragment(vm, node);
    return this.$frag;
  }
}

Compile.prototype = {
  nodeToFragment (vm, node) {
    let root = this;
    const frag = document.createDocumentFragment();
    let child;
    while (child = node.firstChild) {
      root.compileChild(vm, child);
      frag.append(child);
    }
    return frag;
  },
  compileChild (vm, node) {
    const regx = /\{\{(.*)\}\}/g;

    const nodeType = node.nodeType;
    if (nodeType === 1) { // 元素节点
      const attrs = node.attributes; // 获取当前元素的所有属性
      for (let i = 0; i < attrs.length; i++) {
        const attr = attrs[i];
        if (attr.nodeName === 'v-model') {
          const name = attr.nodeValue;
          node.addEventListener('input', function (e) {
            vm[name] = e.target.value;
          }, false);
          new Watcher(vm, node, name, 'value');
        }
      }
    } else if (nodeType === 3) { // 文本节点
      if (regx.test(node.nodeValue)) {
        let name = RegExp.$1; // 获取 {{ message }} 内的 message 属性
        name = name.trim();
        new Watcher(vm, node, name, 'nodeValue');
      }
    }
  }
}