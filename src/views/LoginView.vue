<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const router = useRouter();
const authStore = useAuthStore();

const form = ref({
  email: "",
  password: "",
});
const isLoading = ref(false);
const error = ref(null);

const handleLogin = async () => {
  error.value = null;
  isLoading.value = true;

  try {
    await authStore.login(form.value);
    router.push('/')
  } catch (err) {
    error.value =
      err.response?.data?.message || "Login failed. Please try again.";
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="auth-container">
    <h2>Login</h2>
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="email">Email</label>
        <input
          v-model="form.email"
          type="email"
          id="email"
          required
          placeholder="Enter your email"
        />
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <input
          v-model="form.password"
          type="password"
          id="password"
          required
          placeholder="Enter your password"
        />
      </div>

      <button type="submit" :disabled="isLoading" class="button button-login">
        {{ isLoading ? "Logging in..." : "Login" }}
      </button>

      <p class="auth-link">
        Don't have an account?
        <router-link to="/register">Register</router-link>
      </p>

      <div v-if="error" class="error-message">
        {{ error }}
      </div>
    </form>
  </div>
</template>

<style scoped>

</style>
