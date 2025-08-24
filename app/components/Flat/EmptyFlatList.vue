<script setup lang="ts">
  interface Props {
    title?: string
    description?: string
  }

  const props = defineProps<Props>()
</script>

<template>
  <div class="empty-flat-list">
    <h2 v-if="props.title" class="empty-flat-list__title р2">{{ props.title }}</h2>
    <p v-if="props.description" class="empty-flat-list__desc">{{ props.description }}</p>

    <div class="empty-flat-list__actions">
      <slot />
    </div>
  </div>
</template>

<style scoped lang="scss">
  .empty-flat-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;

    padding: 2rem;
    border-radius: 16px;

    min-height: 240px;

    &__title {
      font-size: 1.25rem;
      font-weight: 600;
      color: #374151;
      margin-bottom: 0.5rem;
    }

    &__desc {
      font-size: 0.95rem;
      color: #6b7280;
      margin-bottom: 1rem;
      max-width: 320px;
    }

    &__actions {
      margin-top: 0.5rem;
    }
  }
</style>
