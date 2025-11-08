<template>
  <header class="article-header">
    <div class="article-meta">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/articles' }"
          >文章</el-breadcrumb-item
        >
        <el-breadcrumb-item v-if="article.category">
          {{ article.category.name }}
        </el-breadcrumb-item>
        <el-breadcrumb-item>正文</el-breadcrumb-item>
      </el-breadcrumb>

      <h1 class="article-title">{{ article.title }}</h1>

      <div class="article-info">
        <div class="author-info">
          <el-avatar :size="40" :src="article.author.avatar" />
          <span class="author-name">{{ article.author.name }}</span>
        </div>

        <div class="meta-items">
          <span class="meta-item">
            <el-icon><Calendar /></el-icon>
            {{ formatDate(article.publishTime) }}
          </span>
          <span class="meta-item">
            <el-icon><View /></el-icon>
            {{ article.viewCount }} 阅读
          </span>
          <span class="meta-item" v-if="article.category">
            <el-tag size="small" @click="navigateToCategory">
              {{ article.category.name }}
            </el-tag>
          </span>
        </div>
      </div>

      <div class="article-tags" v-if="article.tags && article.tags.length">
        <el-tag
          v-for="tag in article.tags"
          :key="tag.id"
          size="small"
          type="info"
          class="tag"
          @click="navigateToTag(tag)"
        >
          #{{ tag.name }}
        </el-tag>
      </div>
    </div>
  </header>
</template>

<script setup>
import { Calendar, View } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";

const props = defineProps({
  article: {
    type: Object,
    required: true,
  },
});

const router = useRouter();

const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const navigateToCategory = () => {
  if (props.article.category) {
    router.push({
      path: "/articles",
      query: { category: props.article.category.name },
    });
  }
};

const navigateToTag = (tag) => {
  router.push({
    path: "/articles",
    query: { tag: tag.name },
  });
};
</script>

<style scoped>
.article-header {
  padding: 40px 40px 20px;
  border-bottom: 1px solid #eaeaea;
}

.article-title {
  font-size: 2.2rem;
  font-weight: 700;
  color: #1a1a1a;
  margin: 20px 0;
  line-height: 1.3;
}

.article-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 20px 0;
  flex-wrap: wrap;
  gap: 15px;
}

.author-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.author-name {
  font-weight: 500;
  color: #4a5568;
}

.meta-items {
  display: flex;
  align-items: center;
  gap: 20px;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #718096;
  font-size: 0.9rem;
}

.article-tags {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.tag {
  cursor: pointer;
}

.tag:hover {
  opacity: 0.8;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .article-header {
    padding: 20px 20px 15px;
  }

  .article-title {
    font-size: 1.8rem;
    margin: 15px 0;
  }

  .article-info {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  .meta-items {
    gap: 15px;
  }
}
</style>
