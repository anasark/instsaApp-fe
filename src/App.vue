<script setup>
import { useRoute } from "vue-router";
import NavBar from "@/components/NavBar.vue";

const route = useRoute();
</script>

<template>
  <NavBar/>
  <br />
  <router-view />
</template>
