<script setup lang="ts">
  useHead({
    title: `Kelnik-test-app`,
    htmlAttrs: {
      lang: `ru`,
    },
    meta: [
      {name: 'description', content: 'Test App Kelnik'},
    ]
  });
</script>

<template>
  <main class="layout container">
    <slot />
    <ScrollToTopButton />
  </main>
</template>

<style lang="scss">
  .layout {
    padding-top: fluid(96, 48);
    padding-bottom: fluid(96, 48);

    @include mobile {
      padding: rem(20);
    }
  }
</style>
