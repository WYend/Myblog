<template>
  <div class="article-list-page">
    <!-- 页面标题 -->
    <div class="page-header">
      <h1 v-if="!filter.category && !filter.tag">所有文章</h1>
      <h1 v-else-if="filter.category">分类: {{ filter.category }}</h1>
      <h1 v-else>标签: {{ filter.tag }}</h1>
      <p class="page-subtitle">共 {{ total }} 篇文章</p>
    </div>

    <!-- 分类标签 -->
    <div class="filter-bar">
      <div class="filter-left">
        <el-select
          v-model="filter.category"
          placeholder="按分类筛选"
          clearable
          @change="handleFilterChange"
          class="filter-select"
        >
          <el-option
            v-for="item in categories"
            :key="item.id"
            :label="item.name"
            :value="item.name"
          />
        </el-select>

        <el-select
          v-model="filter.tag"
          placeholder="按标签筛选"
          clearable
          @change="handleFilterChange"
          class="filter-select"
        >
          <el-option
            v-for="item in tags"
            :key="item.id"
            :label="item.name"
            :value="item.name"
          />
        </el-select>
      </div>

      <div class="filter-right">
        <el-select
          v-model="sortField"
          placeholder="排序方式"
          @change="handleSortChange"
          class="sort-select"
        >
          <el-option label="最新发布" value="publishTime" />
          <el-option label="最多浏览" value="viewCount" />
        </el-select>
      </div>
    </div>

    <!-- 主体，引用ACard -->
    <div class="article-list">
      <ArticleCard
        v-for="article in articles"
        :key="article.id"
        :article="article"
      />

      <div v-if="articles.length === 0" class="empty-state">
        <el-empty description="暂无相关文章" />
      </div>
    </div>

    <!-- 页脚导航 -->
    <div class="pagination" v-if="total > 0">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 50, 100]"
        :small="isSmallScreen"
        :background="true"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, watch, computed, onUnmounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import ArticleCard from "@/components/ArticleCard.vue";

const route = useRoute();
const router = useRouter();

// 响应式数据
const articles = ref([]);
const categories = ref([]);
const tags = ref([]);
const total = ref(0);
const currentPage = ref(1);
const pageSize = ref(10);
const sortField = ref("publishTime");
const sortOrder = ref("desc");
const loading = ref(false);

const filter = reactive({
  category: null,
  tag: null,
  keyword: "",
});

// 屏幕尺寸检测
const isSmallScreen = ref(window.innerWidth < 768);

// 模拟数据 - 后续替换为API调用
const mockArticles = Array.from({ length: 35 }, (_, i) => ({
  id: i + 1,
  title: `文章标题 ${i + 1}`,
  summary: `这是文章 ${
    i + 1
  } 的摘要内容。这是一段较长的摘要文本，用于测试卡片布局和文本截断效果。`,
  content: `这是文章 ${i + 1} 的详细内容...`,
  publishTime: new Date(Date.now() - i * 86400000).toISOString(),
  viewCount: Math.floor(Math.random() * 1000),
  category: {
    id: Math.floor(i / 10) + 1,
    name: `分类${Math.floor(i / 10) + 1}`,
  },
  tags: Array.from({ length: Math.floor(Math.random() * 3) + 1 }, (_, j) => ({
    id: j + 1,
    name: `标签${j + 1}`,
  })),
  thumbnail: i % 4 === 0 ? "https://picsum.photos/300/200" : null,
}));

const mockCategories = [
  { id: 1, name: "前端开发" },
  { id: 2, name: "后端开发" },
  { id: 3, name: "数据库" },
  { id: 4, name: "DevOps" },
];

const mockTags = [
  { id: 1, name: "Vue" },
  { id: 2, name: "Spring Boot" },
  { id: 3, name: "MyBatis" },
  { id: 4, name: "Element Plus" },
  { id: 5, name: "Docker" },
  { id: 6, name: "MySQL" },
];

// 初始化数据
onMounted(() => {
  // 设置初始筛选条件（从路由参数）
  if (route.params.category) {
    filter.category = route.params.category;
  }
  if (route.params.tag) {
    filter.tag = route.params.tag;
  }

  // 加载模拟数据
  loadArticles();
  categories.value = mockCategories;
  tags.value = mockTags;

  // 监听窗口大小变化
  window.addEventListener("resize", handleResize);
});

// 清理事件监听器
// onUnmounted(() => {
//   window.removeEventListener('resize', handleResize)
// })

// 从路由查询参数初始化筛选条件
const initFromRouteQuery = () => {
  const { category, tag, page } = route.query;

  if (category) filter.category = category;
  if (tag) filter.tag = tag;
  if (page) currentPage.value = parseInt(page);
};

// 处理窗口大小变化
const handleResize = () => {
  isSmallScreen.value = window.innerWidth < 768;
};

// 加载文章数据
const loadArticles = () => {
  // 模拟API调用延迟
  setTimeout(() => {
    let filteredArticles = [...mockArticles];

    // 应用筛选条件
    if (filter.category) {
      filteredArticles = filteredArticles.filter(
        (article) => article.category.name === filter.category
      );
    }

    if (filter.tag) {
      filteredArticles = filteredArticles.filter((article) =>
        article.tags.some((tag) => tag.name === filter.tag)
      );
    }

    // 应用排序
    filteredArticles.sort((a, b) => {
      if (sortField.value === "viewCount") {
        return sortOrder.value === "desc"
          ? b.viewCount - a.viewCount
          : a.viewCount - b.viewCount;
      } else {
        return sortOrder.value === "desc"
          ? new Date(b.publishTime) - new Date(a.publishTime)
          : new Date(a.publishTime) - new Date(b.publishTime);
      }
    });

    // 更新总数
    total.value = filteredArticles.length;

    // 应用分页
    const start = (currentPage.value - 1) * pageSize.value;
    const end = start + pageSize.value;
    articles.value = filteredArticles.slice(start, end);
  }, 300);
};

// 处理筛选条件变化
const handleFilterChange = () => {
  currentPage.value = 1; // 重置到第一页
  updateRoute();
  loadArticles();
};

// 处理排序变化
const handleSortChange = () => {
  loadArticles();
};

// 处理每页条数变化
const handleSizeChange = (newSize) => {
  pageSize.value = newSize;
  currentPage.value = 1;
  loadArticles();
};

// 处理页码变化
const handleCurrentChange = (newPage) => {
  currentPage.value = newPage;
  loadArticles();
};

// 更新路由查询参数
const updateRoute = () => {
  const query = { page: currentPage.value };

  if (filter.category) query.category = filter.category;
  if (filter.tag) query.tag = filter.tag;

  router.push({
    path: "/articles",
    query,
  });
};

// 监听路由参数变化（修复版）
watch(
  () => route.query,
  (newQuery) => {
    // 1. 同步页码
    if (newQuery.page) {
      currentPage.value = parseInt(newQuery.page);
    }

    // 2. 同步分类和标签到 filter 对象（关键修复）
    filter.category = newQuery.category || ""; // 若参数不存在，重置为空
    filter.tag = newQuery.tag || "";

    // 3. 重新加载文章（此时会使用最新的筛选条件）
    loadArticles();
  },
  { deep: true } // 确保对象内部属性变化能被监听到（可选，但更稳妥）
);
</script>

<style scoped>
.article-list-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.page-header {
  margin-bottom: 32px;
  padding-bottom: 16px;
  border-bottom: 1px solid #eee;
  text-align: center;
}

.page-header h1 {
  font-size: 2rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 8px;
  position: relative;
  display: inline-block;
}

.page-header h1:after {
  content: "";
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  height: 3px;
  background: linear-gradient(90deg, #3498db, #2ecc71);
  border-radius: 3px;
}

.page-subtitle {
  color: #7f8c8d;
  font-size: 1rem;
  margin-top: 16px;
}

.filter-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 28px;
  flex-wrap: wrap;
  gap: 16px;
  padding: 16px;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.filter-left,
.filter-right {
  display: flex;
  gap: 12px;
}

:deep(.filter-select .el-input__inner),
:deep(.sort-select .el-input__inner) {
  border-radius: 6px;
  border: 1px solid #dcdfe6;
}

:deep(.filter-select .el-input__inner:focus),
:deep(.sort-select .el-input__inner:focus) {
  border-color: #3498db;
  box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
}

.article-list {
  margin-bottom: 32px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 20px;
}

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid #eee;
}

.empty-state {
  padding: 40px 0;
  grid-column: 1 / -1;
}

@media (max-width: 768px) {
  .article-list-page {
    padding: 16px;
    border-radius: 0;
  }

  .filter-bar {
    flex-direction: column;
    align-items: stretch;
    padding: 12px;
  }

  .filter-left,
  .filter-right {
    width: 100%;
  }

  .filter-left {
    margin-bottom: 12px;
  }

  .page-header h1 {
    font-size: 1.6rem;
  }

  .article-list {
    grid-template-columns: 1fr;
    gap: 16px;
  }
}

@media (max-width: 480px) {
  .filter-left {
    flex-direction: column;
  }

  .page-header h1 {
    font-size: 1.4rem;
  }
}
</style>
