import axios from "axios";
import { ElMessage } from "element-plus";
import router from "@/router";

// 创建axios实例
const request = axios.create({
  baseURL: "http://localhost:8080/v3/api-docs", // 根据实际后端地址调整
  timeout: 10000,
});

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    // 添加token等认证信息
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    // 统一错误处理
    if (error.response) {
      switch (error.response.status) {
        case 401:
          ElMessage.error("未授权，请重新登录");
          localStorage.removeItem("token");
          router.push("/login");
          break;
        case 403:
          ElMessage.error("拒绝访问");
          break;
        case 404:
          ElMessage.error("请求资源不存在");
          break;
        case 500:
          ElMessage.error("服务器错误");
          break;
        default:
          ElMessage.error(error.response.data?.message || "网络错误");
      }
    } else {
      ElMessage.error("网络连接失败");
    }
    return Promise.reject(error);
  }
);

export default request;
