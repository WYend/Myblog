<template>
  <div class="layout">
    <Header />
    <main class="main">
      <div class="container">
        <div class="content">
          <router-view />
        </div>
        <div class="sidebar-wrapper">
          <Sidebar />
        </div>
      </div>
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Header from "./Header.vue";
import Footer from "./Footer.vue";
import Sidebar from "./Sidebar.vue";
</script>

<style scoped>
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main {
  flex: 1;
  padding: 20px 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  gap: 20px;
}

.content {
  flex: 1;
  min-width: 0; /* 防止flex元素溢出 */
}

.sidebar-wrapper {
  width: 280px;
}

@media (max-width: 992px) {
  .container {
    flex-direction: column;
  }

  .sidebar-wrapper {
    width: 100%;
  }
}

@media (max-width: 768px) {
  .container {
    padding: 0 15px;
  }
}
</style>
