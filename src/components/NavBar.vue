<script setup>
import { ref, computed, watch } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const router = useRouter();
const authStore = useAuthStore();

const userId = computed(() => authStore.user?.id ?? null);

watch(() => authStore.isAuthenticated, (isAuthenticated) => {
  if (isAuthenticated && !authStore.user) {
    authStore.fetchUser().catch(console.error);
  }
});

const handleLogout = async () => {
  try {
    await authStore.logout();
    router.push("/login");
  } catch (error) {
    console.error("Logout failed:", error);
  }
};
</script>

<template>
  <nav class="navbar">
    <router-link to="/" class="logo">InstaApp</router-link>

    <div v-if="!authStore.isAuthenticated" class="nav-links">
      <router-link to="/login" class="nav-link">
        <button class="button">Login</button>
      </router-link>
    </div>

    <div v-else class="nav-links">
      <router-link to="/posts/create" class="nav-link">
        <button class="button">Create Post</button>
      </router-link>

      <router-link 
        v-if="userId"
        :to="`/users/${userId}`" 
        class="nav-link"
      >
        <button class="button">My Profile</button>
      </router-link>

      <button @click="handleLogout" class="button button-logout">
        Logout
      </button>
    </div>
  </nav>
</template>
