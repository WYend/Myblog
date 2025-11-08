import request from "./request";

// 文章相关API
export const articleApi = {
  // 分页查询文章列表
  getArticles(params) {
    return request.get("/articles", { params });
  },

  // 获取文章详情
  getArticleById(id) {
    return request.get(`/articles/${id}`);
  },

  // 创建文章
  createArticle(data) {
    return request.post("/articles", data);
  },

  // 更新文章
  updateArticle(id, data) {
    return request.put(`/articles/${id}`, data);
  },

  // 删除文章
  deleteArticle(id) {
    return request.delete(`/articles/${id}`);
  },

  // 增加阅读量
  increaseViewCount(id) {
    return request.patch(`/articles/${id}/view-count`);
  },

  // 更改文章状态
  changeArticleStatus(id, status) {
    return request.patch(`/articles/${id}/status`, { status });
  },
};

// 标签相关API
export const tagApi = {
  // 获取所有标签
  getTags() {
    return request.get("/tags");
  },

  // 创建标签
  createTag(data) {
    return request.post("/tags", data);
  },

  // 更新标签
  updateTag(id, data) {
    return request.put(`/tags/${id}`, data);
  },

  // 删除标签
  deleteTag(id) {
    return request.delete(`/tags/${id}`);
  },
};
