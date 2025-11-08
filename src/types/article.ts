// 文章基础信息
export interface Article {
  id: number;
  title: string;
  slug: string;
  summary: string;
  content: string;
  htmlContent: string;
  coverImage: string;
  status: "DRAFT" | "PUBLISHED" | "DELETED";
  isTop: boolean;
  isRecommend: boolean;
  isOriginal: boolean;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  publishTime: string;
  createTime: string;
  updateTime: string;

  // 关联信息
  author: User;
  category: Category;
  tags: Tag[];
}

// 用户信息
export interface User {
  id: number;
  username: string;
  nickname: string;
  email: string;
  avatar: string;
  status: 0 | 1;
  createTime: string;
  updateTime: string;
}

// 分类信息
export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  order_num: number;
}

// 标签信息
export interface Tag {
  id: number;
  name: string;
  slug: string;
  description: string;
}

// 文章查询参数
export interface ArticleQueryDTO {
  keyword?: string;
  categoryId?: number;
  tagId?: number;
  status?: string;
  isTop: number;
  isRecommend: number;
  page?: number;
  size?: number;
  // sort?: string;
}

// 创建/更新文章DTO
export interface ArticleDTO {
  title: string;
  slug?: string;
  content: string;
  summary?: string;
  coverImage?: string;
  categoryId: number;
  status: string;
  tagIds: number[];
  isTop?: number;
  isRecommend?: number;
  isOriginal?: number;
}

// API响应格式
export interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

export interface PageResponse<T> {
  records: T[];
  total: number;
  size: number;
  current: number;
  pages: number;
}
