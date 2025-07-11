<script setup>
import { onMounted, ref } from "vue";
import PostCard from "@/components/PostCard.vue";
import { usePostsStore } from "@/stores/posts";

const postsStore = usePostsStore();
const isLoading = ref(false);

onMounted(async () => {
  isLoading.value = true;
  await postsStore.fetchPosts();
  isLoading.value = false;
});
</script>

<template>
  <div class="home">
    <div v-if="isLoading">Loading posts...</div>

    <div v-else>
      <PostCard v-for="post in postsStore.posts" :key="post.id" :post="post" />
    </div>
  </div>
</template>
