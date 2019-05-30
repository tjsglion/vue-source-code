// 属性绑定至vm实例上
function defineReaction (vm, key, value) {
  let dep = new Dep(); // 发布-订阅容器
  Object.defineProperty(vm, key, {
    configurable: true,
    enumerable: true,
    get: function () {
      if (Dep.target) { // 添加订阅者
        dep.addSub(Dep.target);
      }
      return value;
    },
    set: function (newValue) {
      if (newValue === value) return;
      value = newValue;
      // 调用dep.notify方法
      dep.notify();
    }
  })
}

function observer(vm, data) {
  Object.keys(data).forEach(key => {
    defineReaction(vm, key, data[key]);
  });
}
