<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const router = useRouter();
const authStore = useAuthStore();

const form = ref({
  name: "",
  username: "",
  email: "",
  password: "",
  password_confirmation: "",
  profile_image: null,
});
const isLoading = ref(false);
const error = ref(null);

const handleRegister = async () => {
  error.value = null;
  isLoading.value = true;

  try {
    const formData = new FormData();
    Object.keys(form.value).forEach((key) => {
      if (form.value[key]) {
        formData.append(key, form.value[key]);
      }
    });

    await authStore.register(formData);

  } catch (err) {
    error.value =
      err.response?.data?.message || "Registration failed. Please try again.";
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="auth-container">
    <h2>Register</h2>
    <form @submit.prevent="handleRegister">
      <div class="form-group">
        <label for="name">Name</label>
        <input
          v-model="form.name"
          type="text"
          id="name"
          required
          placeholder="Enter your name"
        />
      </div>

      <div class="form-group">
        <label for="username">Username</label>
        <input
          v-model="form.username"
          type="text"
          id="username"
          required
          placeholder="Choose a username"
        />
      </div>

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
          placeholder="Create a password"
        />
      </div>

      <div class="form-group">
        <label for="password_confirmation">Confirm Password</label>
        <input
          v-model="form.password_confirmation"
          type="password"
          id="password_confirmation"
          required
          placeholder="Confirm your password"
        />
      </div>

      <button type="submit" :disabled="isLoading" class="button button-register">
        {{ isLoading ? "Registering..." : "Register" }}
      </button>

      <p class="auth-link">
        Already have an account? <router-link to="/login">Login</router-link>
      </p>

      <div v-if="error" class="error-message">
        {{ error }}
      </div>
    </form>
  </div>
</template>
