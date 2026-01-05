<template>
  <div class="vue-obsidian-app">
    <h2>Vue3 + Obsidian 插件2</h2>
    <p>当前计数：{{ count }}</p>
    <button @click="increment">点击+1</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 简单的响应式数据示例
const count = ref(0);
const increment = () => {
  count.value++;
};
</script>

<style scoped>
.vue-obsidian-app {
  padding: 16px;
  color: var(--text-normal);
  background-color: var(--background-primary);
}
button {
  padding: 4px 8px;
  margin-top: 8px;
  cursor: pointer;
  background-color: var(--interactive-accent);
  color: white;
  border: none;
  border-radius: 4px;
}
</style>