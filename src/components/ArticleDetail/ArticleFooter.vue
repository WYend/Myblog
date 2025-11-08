<template>
  <footer class="article-footer">
    <div class="footer-content">
      <div class="action-buttons">
        <el-button type="primary" :icon="Share" round>分享</el-button>
        <el-button :icon="Star" round>收藏</el-button>
        <el-button :icon="ThumbUpFilled" round>点赞</el-button>
      </div>

      <div class="article-meta-footer">
        <span>发布于 {{ formatDate(article.publishTime) }}</span>
        <span>•</span>
        <span
          >最后更新于
          {{ formatDate(article.updateTime || article.publishTime) }}</span
        >
      </div>
    </div>
  </footer>
</template>

<script setup>

const props = defineProps({
  article: {
    type: Object,
    required: true,
  },
});

const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};
</script>

<style scoped>
.article-footer {
  padding: 20px 40px;
  border-top: 1px solid #eaeaea;
  background-color: #fafafa;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 15px;
}

.action-buttons {
  display: flex;
  gap: 10px;
}

.article-meta-footer {
  color: #718096;
  font-size: 0.9rem;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .article-footer {
    padding: 15px 20px;
  }

  .footer-content {
    flex-direction: column;
    align-items: flex-start;
  }

  .action-buttons {
    width: 100%;
    justify-content: center;
  }
}
</style>
