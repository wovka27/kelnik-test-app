<script setup lang="ts">
  import type { NuxtError } from "#app";

  defineProps<{ error: NuxtError }>();
</script>

<template>
  <ErrorWrapper>
    <ErrorContent title="Произошла ошибка" :text="error.message" />
    <ErrorBackButton />
  </ErrorWrapper>
</template>
