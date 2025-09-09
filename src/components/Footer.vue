<template>
  <footer class="footer">
    <div class="footer-content">
      <p>&copy; {{ new Date().getFullYear() }} 我的技术博客. 保留所有权利.</p>
      <div class="footer-links">
        <a href="#">关于</a>
        <a href="#">联系</a>
        <a href="#">隐私政策</a>
      </div>
    </div>
  </footer>
</template>

<script setup>
// 这里可以添加组件逻辑
</script>

<style scoped>
.footer {
  background-color: #f9f9f9;
  border-top: 1px solid #eaeaea;
  padding: 20px 0;
  margin-top: 40px;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer-links {
  display: flex;
  gap: 20px;
}

.footer-links a {
  color: #606266;
  text-decoration: none;
}

.footer-links a:hover {
  color: #409eff;
}

@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
    gap: 10px;
  }
}
</style>
