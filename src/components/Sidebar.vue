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
          @click="handleCategoryClick(category.name)"
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
          @click="handleTagClick(tag.name)"
        >
          {{ tag.name }}
        </el-tag>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

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

// 处理分类点击
const handleCategoryClick = (categoryName) => {
  router.push({
    path: "/articles",
    query: { category: categoryName, page: 1 },
  });
};

// 处理标签点击
const handleTagClick = (tagName) => {
  router.push({
    path: "/articles",
    query: { tag: tagName, page: 1 },
  });
};
</script>

<style scoped>
.sidebar {
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
}

.sidebar-section {
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  border: 1px solid #f0f0f0;
  transition: all 0.3s ease;
}

.sidebar-section:hover {
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
  transform: translateY(-2px);
}

.sidebar-section h3 {
  margin-top: 0;
  margin-bottom: 15px;
  color: #303133;
  font-size: 1.1rem;
  font-weight: 600;
  padding-bottom: 10px;
  border-bottom: 1px solid #f5f5f5;
}

.author-info {
  text-align: center;
}

.author-info p {
  margin-top: 10px;
  color: #606266;
  font-size: 0.9rem;
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
  transition: all 0.2s ease;
  border: none;
}

.category-tag:hover,
.tag:hover {
  transform: translateY(-2px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
}

/* 响应式：移动端（≤992px）时，恢复正常流 */
@media (max-width: 992px) {
  .sidebar {
    position: static;
    width: 100%;
    margin-top: 20px;
  }

  .sidebar-section {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  }
}
</style>
