import { createApp } from 'vue';
import App from './App.vue';

// 暴露挂载函数，接收 DOM 元素作为参数
export function mountVueApp(el: HTMLElement) {
  const app = createApp(App);
  app.mount(el);
  // 返回卸载函数（可选，用于插件销毁时清理 Vue 实例）
  return () => {
    app.unmount();
  };
}