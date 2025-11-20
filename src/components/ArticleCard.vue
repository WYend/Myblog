<template>
  <div class="article-card">
    <div class="article-content">
      <div class="article-header">
        <h3 class="article-title" @click="navigateToDetail">
          {{ article.title }}
        </h3>
        <!-- 标题和数据展示 -->
        <div class="article-meta">
          <span class="publish-date">
            <el-icon><Calendar /></el-icon>
            {{ formatDate(article.publishTime) }}
          </span>
          <span class="views">
            <el-icon><View /></el-icon>
            {{ article.viewCount || 0 }}
          </span>
          <span class="category" v-if="article.category">
            <el-tag size="small" @click.stop="navigateToCategory">
              {{ article.category.name }}
            </el-tag>
          </span>
        </div>
      </div>
      <!-- 摘要 -->
      <div class="article-summary">
        {{ article.summary }}
      </div>
      <!-- 页脚 -->
      <div class="article-footer">
        <div class="tags" v-if="article.tags && article.tags.length">
          <el-tag
            v-for="tag in article.tags"
            :key="tag.id"
            size="small"
            type="info"
            class="tag"
            @click.stop="navigateToTag(tag)"
          >
            {{ tag.name }}
          </el-tag>
        </div>
        <el-button type="primary" size="small" link @click="navigateToDetail">
          阅读更多
        </el-button>
      </div>
    </div>
    <!--     
    <div class="article-thumb" v-if="article.thumbnail">
      <img :src="article.thumbnail" alt="文章缩略图" />
    </div>
-->
  </div>
</template>

<script setup>
import { Calendar, View } from "@element-plus/icons-vue";
import { useRoute, useRouter } from "vue-router";

const props = defineProps({
  article: {
    type: Object,
    required: true,
  },
});

const router = useRouter();

// 格式化日期：后续直接引用数据库数据
const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};

// 跳转到文章详情页
const navigateToDetail = () => {
  router.push(`/article/${props.article.id}`);
};

// 按分类筛选文章
const navigateToCategory = () => {
  if (props.article.category) {
    router.push({
      path: "/articles",
      query: { categoryId: props.article.category.id },
    });
  }
};

// 按标签筛选文章
const navigateToTag = (tag) => {
  router.push({
    path: "/articles",
    query: {
      tagId: tag.id,
      page: 1,
    },
  });
};
</script>

<style scoped>
.article-card {
  display: flex;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
}

.article-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.article-content {
  flex: 1;
  padding: 20px;
}

.article-thumb {
  width: 240px;
  min-height: 160px;
  overflow: hidden;
}

.article-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.article-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 12px 0;
  color: #303133;
  cursor: pointer;
}

.article-title:hover {
  color: #409eff;
}

.article-meta {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 15px;
  font-size: 0.875rem;
  color: #909399;
}

.article-meta span {
  display: flex;
  align-items: center;
  gap: 4px;
}

.article-summary {
  color: #606266;
  line-height: 1.6;
  margin-bottom: 15px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.article-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.tag {
  cursor: pointer;
}

.tag:hover {
  opacity: 0.8;
}

@media (max-width: 768px) {
  .article-card {
    flex-direction: column;
  }

  .article-thumb {
    width: 100%;
    height: 200px;
    order: -1;
  }

  .article-meta {
    flex-wrap: wrap;
    gap: 10px;
  }

  .article-footer {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
}
</style>
