<template>
  <aside class="sidebar">
    <div class="sidebar-section">
      <h3>关于我</h3>
      <div class="author-info">
        <el-avatar :size="80" src="https://placeholder.com/80" />
        <p>热爱技术的全栈开发者</p>
      </div>
    </div>

    <div class="sidebar-section">
      <h3>分类</h3>
      <div class="categories">
        <el-tag
          v-for="category in categories"
          :key="category.id"
          class="category-tag"
          @click="$router.push(`/category/${category.name}`)"
        >
          {{ category.name }} ({{ category.count }})
        </el-tag>
      </div>
    </div>

    <div class="sidebar-section">
      <h3>热门标签</h3>
      <div class="tags">
        <el-tag
          v-for="tag in tags"
          :key="tag.id"
          type="info"
          class="tag"
          @click="$router.push(`/tag/${tag.name}`)"
        >
          {{ tag.name }}
        </el-tag>
      </div>
    </div>
  </aside>
</template>

<script setup>
// 模拟数据，后续替换为API调用
const categories = [
  { id: 1, name: "前端开发", count: 15 },
  { id: 2, name: "后端开发", count: 12 },
  { id: 3, name: "数据库", count: 8 },
  { id: 4, name: "DevOps", count: 5 },
];

const tags = [
  { id: 1, name: "Vue" },
  { id: 2, name: "Spring Boot" },
  { id: 3, name: "MyBatis" },
  { id: 4, name: "Element Plus" },
  { id: 5, name: "Docker" },
  { id: 6, name: "MySQL" },
];
</script>

<style scoped>
.sidebar {
  width: 280px;
}

.sidebar-section {
  background-color: #fff;
  border-radius: 4px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.sidebar-section h3 {
  margin-top: 0;
  margin-bottom: 15px;
  color: #303133;
  font-size: 1.1rem;
}

.author-info {
  text-align: center;
}

.author-info p {
  margin-top: 10px;
  color: #606266;
}

.categories,
.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.category-tag,
.tag {
  cursor: pointer;
}

.category-tag:hover,
.tag:hover {
  opacity: 0.8;
}

@media (max-width: 992px) {
  .sidebar {
    width: 100%;
    margin-top: 20px;
  }
}
</style>
