<template>
  <div class="auth-container">
    <div class="auth-card">
      <div class="auth-header">
        <h2>登录博客管理系统</h2>
        <p>请输入您的账号和密码</p>
      </div>

      <el-form
        :model="loginForm"
        :rules="loginRules"
        ref="loginFormRef"
        class="auth-form"
        @keyup.enter="handleLogin"
      >
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            placeholder="用户名"
            size="large"
            :prefix-icon="User"
          />
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            placeholder="密码"
            size="large"
            :prefix-icon="Lock"
            show-password
          />
        </el-form-item>

        <el-form-item>
          <el-checkbox v-model="loginForm.remember">记住我</el-checkbox>
          <el-link type="primary" :underline="false" class="forgot-link"
            >忘记密码?</el-link
          >
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            size="large"
            class="auth-btn"
            :loading="loading"
            @click="handleLogin"
          >
            登录
          </el-button>
        </el-form-item>
      </el-form>

      <div class="auth-footer">
        <p>
          还没有账号?
          <el-link type="primary" @click="$router.push('/register')"
            >立即注册</el-link
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import { User, Lock } from "@element-plus/icons-vue";

const router = useRouter();
const loading = ref(false);

// 登录表单数据
const loginForm = reactive({
  username: "",
  password: "",
  remember: false,
});

// 表单验证规则
const loginRules = reactive({
  username: [
    { required: true, message: "请输入用户名", trigger: "blur" },
    { min: 3, max: 20, message: "长度在 3 到 20 个字符", trigger: "blur" },
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 6, max: 20, message: "长度在 6 到 20 个字符", trigger: "blur" },
  ],
});

const loginFormRef = ref();

// 处理登录
const handleLogin = async () => {
  if (!loginFormRef.value) return;

  try {
    const valid = await loginFormRef.value.validate();
    if (!valid) return;

    loading.value = true;
    // 这里调用登录API
    // await loginApi(loginForm)

    // 模拟API调用
    setTimeout(() => {
      ElMessage.success("登录成功");
      router.push("/admin"); // 跳转到后台管理页面
      loading.value = false;
    }, 1000);
  } catch (error) {
    loading.value = false;
    ElMessage.error("用户名或密码错误");
  }
};
</script>

<style scoped>
.auth-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 20px;
}

.auth-card {
  width: 100%;
  max-width: 400px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  padding: 30px;
}

.auth-header {
  text-align: center;
  margin-bottom: 30px;
}

.auth-header h2 {
  color: #303133;
  margin-bottom: 10px;
  font-weight: 600;
}

.auth-header p {
  color: #909399;
  font-size: 14px;
}

.auth-form {
  margin-bottom: 20px;
}

.forgot-link {
  float: right;
}

.auth-btn {
  width: 100%;
  margin-top: 10px;
}

.auth-footer {
  text-align: center;
  color: #606266;
  font-size: 14px;
}

.auth-footer a {
  font-weight: 500;
}
</style>
