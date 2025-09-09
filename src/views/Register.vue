<template>
  <div class="auth-container">
    <div class="auth-card">
      <div class="auth-header">
        <h2>注册新账号</h2>
        <p>创建您的博客管理账号</p>
      </div>

      <el-form
        :model="registerForm"
        :rules="registerRules"
        ref="registerFormRef"
        class="auth-form"
        @keyup.enter="handleRegister"
      >
        <el-form-item prop="username">
          <el-input
            v-model="registerForm.username"
            placeholder="用户名"
            size="large"
            :prefix-icon="User"
          />
        </el-form-item>

        <el-form-item prop="email">
          <el-input
            v-model="registerForm.email"
            placeholder="邮箱"
            size="large"
            :prefix-icon="Message"
          />
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            v-model="registerForm.password"
            type="password"
            placeholder="密码"
            size="large"
            :prefix-icon="Lock"
            show-password
          />
        </el-form-item>

        <el-form-item prop="confirmPassword">
          <el-input
            v-model="registerForm.confirmPassword"
            type="password"
            placeholder="确认密码"
            size="large"
            :prefix-icon="Lock"
            show-password
          />
        </el-form-item>

        <el-form-item>
          <el-checkbox v-model="registerForm.agree"
            >我已阅读并同意<a href="#" class="agreement-link">服务条款</a>和<a
              href="#"
              class="agreement-link"
              >隐私政策</a
            ></el-checkbox
          >
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            size="large"
            class="auth-btn"
            :loading="loading"
            @click="handleRegister"
          >
            注册
          </el-button>
        </el-form-item>
      </el-form>

      <div class="auth-footer">
        <p>
          已有账号?
          <el-link type="primary" @click="$router.push('/login')"
            >立即登录</el-link
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch } from "vue";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import { User, Lock, Message } from "@element-plus/icons-vue";

const router = useRouter();
const loading = ref(false);

// 注册表单数据
const registerForm = reactive({
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  agree: false,
});

// 验证确认密码
const validatePass2 = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("请再次输入密码"));
  } else if (value !== registerForm.password) {
    callback(new Error("两次输入密码不一致!"));
  } else {
    callback();
  }
};

// 验证同意条款
const validateAgree = (rule, value, callback) => {
  if (!value) {
    callback(new Error("请阅读并同意条款"));
  } else {
    callback();
  }
};

// 表单验证规则
const registerRules = reactive({
  username: [
    { required: true, message: "请输入用户名", trigger: "blur" },
    { min: 3, max: 20, message: "长度在 3 到 20 个字符", trigger: "blur" },
  ],
  email: [
    { required: true, message: "请输入邮箱地址", trigger: "blur" },
    { type: "email", message: "请输入正确的邮箱地址", trigger: "blur" },
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 6, max: 20, message: "长度在 6 到 20 个字符", trigger: "blur" },
  ],
  confirmPassword: [
    { required: true, validator: validatePass2, trigger: "blur" },
  ],
  agree: [{ validator: validateAgree, trigger: "change" }],
});

const registerFormRef = ref();

// 处理注册
const handleRegister = async () => {
  if (!registerFormRef.value) return;

  try {
    const valid = await registerFormRef.value.validate();
    if (!valid) return;

    loading.value = true;
    // 这里调用注册API
    // await registerApi(registerForm)

    // 模拟API调用
    setTimeout(() => {
      ElMessage.success("注册成功，请登录");
      router.push("/login");
      loading.value = false;
    }, 1000);
  } catch (error) {
    loading.value = false;
    ElMessage.error("注册失败，请重试");
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
  max-width: 450px;
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

.agreement-link {
  color: #409eff;
  text-decoration: none;
  padding: 0 3px;
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
