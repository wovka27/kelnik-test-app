<script setup lang="ts">
  interface ErrorContentProps {
    title: string;
    text: string;
  }
  defineProps<ErrorContentProps>();
</script>

<template>
  <div class="error-content">
    <h1 class="error-content__title">{{ title }}</h1>
    <p class="error-content__text">{{ text }}</p>
  </div>
</template>

<style lang="scss">
  .error-content {
    &__title {
      font-size: 2.5rem;
      margin: 1rem 0;
      color: var(--color-dark-blue);
    }

    &__text {
      color: var(--color-dark-blue);
      margin-bottom: 1.5rem;
    }
  }
</style>
