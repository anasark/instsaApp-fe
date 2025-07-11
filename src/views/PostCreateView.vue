<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { usePostsStore } from "@/stores/posts";

const router = useRouter();
const postsStore = usePostsStore();
const caption = ref("");
const image = ref(null);
const isLoading = ref(false);

const handleImageChange = (e) => {
  image.value = e.target.files[0];
};

const submitPost = async () => {
  if (!caption.value || !image.value) return;

  isLoading.value = true;

  try {
    const formData = new FormData();
    formData.append("caption", caption.value);
    formData.append("image", image.value);

    await postsStore.createPost(formData);
    router.push("/");
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="auth-container">
    <h2>Create New Post</h2>
    <form @submit.prevent="submitPost">
      <div class="form-group">
        <textarea
          v-model="caption"
          placeholder="Write a caption..."
          required
          class="textarea"
        ></textarea>
      </div>
      <div class="form-group">
        <input
          type="file"
          accept="image/*"
          @change="handleImageChange"
          required
          class="file-input"
        />
      </div>
      <button type="submit" :disabled="isLoading" class="button button-post">
        {{ isLoading ? "Posting..." : "Share Post" }}
      </button>
    </form>
  </div>
</template>

<style scoped>

</style>
