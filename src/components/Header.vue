<template>
  <header class="header">
    <div class="header-container">
      <div class="logo">
        <router-link to="/">我的技术博客</router-link>
      </div>
      <nav class="nav">
        <router-link to="/">首页</router-link>
        <router-link to="/articles">文章</router-link>
        <!-- 可以添加更多导航链接 -->
      </nav>
      <div class="header-right">
        <el-input placeholder="搜索文章..." class="search-input" size="small">
          <template #append>
            <el-button :icon="Search" />
          </template>
        </el-input>
        <el-switch
          v-model="isDark"
          inline-prompt
          :active-icon="Moon"
          :inactive-icon="Sunny"
          @change="toggleDarkMode"
        />
        <div class="auth-buttons" v-if="!isLoggedIn">
          <el-button @click="$router.push('/login')">登录</el-button>
          <el-button type="primary" @click="$router.push('/register')"
            >注册</el-button
          >
        </div>
        <div class="user-info" v-else>
          <el-dropdown>
            <span class="el-dropdown-link">
              <el-avatar :size="32" :src="user.avatar" />
              {{ user.username }}
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="$router.push('/admin')"
                  >管理后台</el-dropdown-item
                >
                <el-dropdown-item divided @click="handleLogout"
                  >退出登录</el-dropdown-item
                >
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from "vue";
import { Search, Moon, Sunny } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
import { ElMessageBox } from "element-plus";
const isDark = ref(false);

const toggleDarkMode = (val) => {
  // 切换暗色模式的逻辑
  if (val) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
};

const router = useRouter();
const isLoggedIn = ref(false); // 根据实际登录状态更新
const user = ref({
  username: "管理员",
  avatar: "https://placeholder.com/32",
});

const handleLogout = () => {
  ElMessageBox.confirm("确定要退出登录吗?", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      // 执行退出登录操作
      isLoggedIn.value = false;
      router.push("/");
    })
    .catch(() => {});
};
</script>

<style scoped>
.header {
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo a {
  font-size: 1.5rem;
  font-weight: bold;
  color: #409eff;
  text-decoration: none;
}

.nav {
  display: flex;
  gap: 20px;
}

.nav a {
  color: #606266;
  text-decoration: none;
  font-weight: 500;
}

.nav a.router-link-active {
  color: #409eff;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 15px;
}

.search-input {
  width: 250px;
}

@media (max-width: 768px) {
  .header-container {
    padding: 0 15px;
  }

  .nav {
    display: none;
  }

  .search-input {
    width: 180px;
  }
}

.auth-buttons {
  display: flex;
  gap: 10px;
}

.user-info {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.el-dropdown-link {
  display: flex;
  align-items: center;
  gap: 8px;
}
</style>
