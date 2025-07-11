<script setup>
import { ref } from "vue";
import { useApi } from "@/composables/useApi";

const props = defineProps({
  postId: {
    type: [String, Number],
    required: true,
  },
});

const emit = defineEmits(["comment-added"]);

const content = ref("");
const isSubmitting = ref(false);
const error = ref(null);

const submitComment = async () => {
  if (!content.value.trim()) return;

  isSubmitting.value = true;
  error.value = null;

  try {
    const { data } = await useApi().post(`/posts/${props.postId}/comments`, {
      content: content.value,
    });

    emit("comment-added", data);
    content.value = "";
  } catch (err) {
    error.value = err.response?.data?.message || "Failed to post comment";
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <form @submit.prevent="submitComment" class="comment-form">
    <div class="form-group">
      <input
        v-model="content"
        type="text"
        placeholder="Add a comment..."
        :disabled="isSubmitting"
      />
      <button
        type="submit"
        :disabled="!content.trim() || isSubmitting"
        class="button button-comment"
      >
        <span v-if="!isSubmitting">Post</span>
        <span v-else class="loading">...</span>
      </button>
    </div>
    <p v-if="error" class="error-message">{{ error }}</p>
  </form>
</template>

<style scoped>
.comment-form {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #eee;
}

.form-group {
  display: flex;
  gap: 0.5rem;
}

input {
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.submit-btn {
  padding: 0 1rem;
  background-color: #3490dc;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.submit-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.loading {
  display: inline-block;
  animation: pulse 1s infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.error-message {
  color: #e3342f;
  font-size: 0.875rem;
  margin-top: 0.5rem;
}
</style>
