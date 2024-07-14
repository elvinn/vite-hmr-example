console.log('执行 main.js');

let counter = 0;

// 更新 HTML 中的 counter
function updateCounter() {
  document.getElementById('counter').innerText = counter;
}

// 点击事件响应函数
function onIncrement() {
  counter++;
  updateCounter();
}

// 绑定监听事件
const incrementButton = document.getElementById('increment');
incrementButton.addEventListener('click', onIncrement);

// HMR API 处理
if (import.meta.hot) {
  // 注册新代码生效时的回调
  import.meta.hot.accept(() => {
    console.log('执行 accept');
  });

  // 注册旧代码被移除时的回调
  import.meta.hot.dispose((data) => {
    console.log('执行 dispose', data);
    // 保存旧数据
    data.counter = counter;
    // 移除副作用
    incrementButton.removeEventListener('increment', onIncrement);
  });

  if (typeof import.meta.hot.data.counter!== 'undefined') {
    // 恢复旧数据
    console.log('恢复数据');
    counter = import.meta.hot.data.counter;
  }
}
