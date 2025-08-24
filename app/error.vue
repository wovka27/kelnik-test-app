<script setup lang="ts">
  import type { NuxtError } from "#app";
  import { ErrorComponent404, ErrorComponent500, ErrorDefault } from "#components";

  const props = defineProps<{ error: NuxtError }>();

  const errorPage = computed(
    () =>
      ({
        404: ErrorComponent404,
        500: ErrorComponent500,
      })[props.error.statusCode] || ErrorDefault
  );
</script>

<template>
  <component :is="errorPage" :error="error" />
</template>
