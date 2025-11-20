<template>
  <div class="article-detail-page" v-loading="loading">
    <!-- 加载状态 -->
    <div v-if="loading" class="loading-container">
      <el-skeleton :rows="10" animated />
    </div>

    <!-- 错误状态 -->
    <div v-else-if="error" class="error-container">
      <el-result icon="error" title="文章加载失败" :sub-title="error">
        <template #extra>
          <el-button type="primary" @click="loadArticle">重试</el-button>
        </template>
      </el-result>
    </div>

    <!-- 内容展示 -->
    <div v-else-if="article" class="article-container">
      <!-- 文章头部 -->
      <article-header :article="article" />

      <!-- 文章内容 -->
      <div class="article-content">
        <div class="markdown-body" v-html="compiledMarkdown" />
      </div>

      <!-- 文章底部 -->
      <article-footer :article="article" />
    </div>

    <!-- 文章不存在 -->
    <div v-else class="not-found">
      <el-result icon="warning" title="文章不存在">
        <template #extra>
          <el-button type="primary" @click="$router.push('/articles')">
            返回文章列表
          </el-button>
        </template>
      </el-result>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { renderMarkdown } from "@/utils/markdownRederer";
import ArticleHeader from "@/components/ArticleDetail/ArticleHeader.vue";
import ArticleFooter from "@/components/ArticleDetail/ArticleFooter.vue";
import { articleApi } from "@/api/articles";
import { ElMessage } from "element-plus";

const route = useRoute();
const loading = ref(true);
const error = ref(null);
const article = ref(null);

// 计算属性：编译Markdown内容
const compiledMarkdown = computed(() => {
  if (!article.value?.content) return "";
  return renderMarkdown(article.value.content);
});

// 加载文章数据
const loadArticle = async () => {
  try {
    loading.value = true;
    error.value = null;

    const articleId = route.params.id;
    const response = await articleApi.getArticleById(articleId);

    article.value = response.data || response;

    // 更新阅读量
    await articleApi.increaseViewCount(articleId);
  } catch (err) {
    error.value = err.message || "加载文章失败";
    console.error("加载文章失败:", err);
  } finally {
    loading.value = false;
  }
};

// 监听路由参数变化
watch(
  () => route.params.id,
  (newId) => {
    if (newId) {
      loadArticle();
    }
  }
);

// 组件挂载时加载文章
onMounted(() => {
  if (route.params.id) {
    loadArticle();
  }
});
</script>

<style scoped>
.article-detail-page {
  min-height: 100vh;
  padding: 20px 0;
  max-width: 900px;
  margin: 0 auto;
}

.loading-container,
.error-container,
.not-found {
  padding: 40px 20px;
  text-align: center;
}

.article-container {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.article-content {
  padding: 0 40px 40px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .article-detail-page {
    padding: 10px;
  }

  .article-content {
    padding: 0 20px 20px;
  }
}
</style>

<style>
/* Markdown内容样式 */
.markdown-body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial,
    sans-serif;
  font-size: 16px;
  line-height: 1.6;
  color: #24292e;
}

.markdown-body h1,
.markdown-body h2,
.markdown-body h3,
.markdown-body h4,
.markdown-body h5,
.markdown-body h6 {
  margin-top: 1.5em;
  margin-bottom: 0.5em;
  font-weight: 600;
  line-height: 1.25;
}

.markdown-body h1 {
  font-size: 2em;
}
.markdown-body h2 {
  font-size: 1.5em;
}
.markdown-body h3 {
  font-size: 1.25em;
}

.markdown-body p {
  margin-top: 0;
  margin-bottom: 1em;
}

.markdown-body code {
  padding: 0.2em 0.4em;
  margin: 0;
  font-size: 0.85em;
  background-color: #f6f8fa;
  border-radius: 3px;
}

.markdown-body pre {
  background-color: #f6f8fa;
  border-radius: 6px;
  padding: 16px;
  overflow: auto;
  margin: 1em 0;
}

.markdown-body pre code {
  background: none;
  padding: 0;
  margin: 0;
  font-size: 0.85em;
}

.markdown-body blockquote {
  padding: 0 1em;
  color: #6a737d;
  border-left: 0.25em solid #dfe2e5;
  margin: 1em 0;
}

.markdown-body table {
  border-collapse: collapse;
  width: 100%;
  margin: 1em 0;
}

.markdown-body table th,
.markdown-body table td {
  padding: 0.5em 1em;
  border: 1px solid #dfe2e5;
}

.markdown-body table th {
  background-color: #f6f8fa;
  font-weight: 600;
}

.markdown-body ul,
.markdown-body ol {
  margin: 1em 0;
  padding-left: 2em;
}

.markdown-body li {
  margin: 0.25em 0;
}

.markdown-body img {
  max-width: 100%;
  height: auto;
  border-radius: 6px;
}

/* 暗色模式支持 */
.dark .markdown-body {
  color: #e5e7eb;
}

.dark .markdown-body code {
  background-color: #374151;
}

.dark .markdown-body pre {
  background-color: #1f2937;
}
</style>
