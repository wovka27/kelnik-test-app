<template>
  <div class="error-wrapper"><slot /></div>
</template>

<style lang="scss">
  .error-wrapper {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 2rem;
  }
</style>
