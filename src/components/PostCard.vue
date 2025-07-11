<script setup>
import { ref, computed } from "vue";
import { useAsset } from "@/composables/useAsset";

const { getStorageUrl } = useAsset()

const postImage = computed(() => getStorageUrl(props.post.image))

const props = defineProps({
  post: Object,
});

const likeCount = ref(props.post.likes?.length || 0);
const comments = ref(props.post.comments || []);
</script>

<template>
  <div class="post-card">
    <img :src="postImage" class="post-image" />

    <div class="post-actions">
      <button class="button">
        ❤️ {{ likeCount }}
      </button>
      <button class="button">
        💬 {{ comments.length }}
      </button>
    </div>

    <p class="post-caption">
      <strong>{{ post.user.name }}</strong> . {{ post.caption }}
    </p>
  </div>
</template>
