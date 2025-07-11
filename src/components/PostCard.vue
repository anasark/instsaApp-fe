<script setup>
import { ref, computed } from "vue";
import { useApi } from "@/composables/useApi";
import { useAsset } from "@/composables/useAsset";
import { useAuthStore } from "@/stores/auth";
import CommentForm from "@/components/CommentForm.vue";

const authStore = useAuthStore();

const { getStorageUrl } = useAsset()

const postImage = computed(() => getStorageUrl(props.post.image))

const props = defineProps({
  post: Object,
});

const isLiked = ref(
  props.post.likes?.some((like) => like.user_id === authStore.user?.id)
);

const likeCount = ref(props.post.likes?.length || 0);
const comments = ref(props.post.comments || []);
const showComments = ref(false);

const toggleLike = async () => {
  try {
    const api = useApi();
    if (isLiked.value) {
      await api.delete(`/posts/${props.post.id}/likes`);
      likeCount.value--;
    } else {
      await api.post(`/posts/${props.post.id}/likes`);
      likeCount.value++;
    }
    isLiked.value = !isLiked.value;
  } catch (error) {
    console.error(error);
  }
};

const addComment = (comment) => {
  comments.value.push(comment);
};
</script>

<template>
  <div class="post-card">
    <img :src="postImage" class="post-image" />

    <div class="post-actions">
      <button @click="toggleLike" class="button">
        <span v-if="isLiked">❤️</span>
        <span v-else>🤍</span>
        {{ likeCount }}
      </button>
      <button @click="showComments = !showComments" class="button">
        💬 {{ comments.length }}
      </button>
    </div>

    <p class="post-caption">
      <strong>{{ post.user.name }}</strong> . {{ post.caption }}
    </p>

    <div v-if="showComments" class="comments-section">
      <CommentForm :post-id="post.id" @comment-added="addComment" />
      <div v-for="comment in comments" :key="comment.id" class="comment">
        <strong>{{ comment.user.name }}</strong
        >: {{ comment.content }}
      </div>
    </div>
  </div>
</template>
