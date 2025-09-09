<template>
  <div id="app">
    <Layouts />
  </div>
</template>

<script setup>
import Layouts from "./components/Layouts.vue";
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  color: #303133;
  background-color: #f5f7fa;
}

#app {
  min-height: 100vh;
}

/* 暗色模式样式 */
.dark {
  color-scheme: dark;
}

.dark body {
  background-color: #1a1a1a;
  color: #e5e7eb;
}

.dark .header {
  background-color: #141414;
}

.dark .footer {
  background-color: #141414;
  border-top-color: #2d2d2d;
}

.dark .sidebar-section {
  background-color: #141414;
}
</style>
