<script setup lang="ts">
  defineProps<{ number: string }>();
</script>

<template>
  <svg class="error-status-code" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600">
    <text x="400" y="320" text-anchor="middle" font-size="150" fill="#1677ff" font-weight="bold">
      {{ number }}
    </text>
  </svg>
</template>

<style lang="scss">
  .error-status-code {
    max-width: 400px;
    width: 100%;
    height: auto;
    animation: float 3s ease-in-out infinite;
  }

  @keyframes float {
    0%,
    100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-10px);
    }
  }
</style>
