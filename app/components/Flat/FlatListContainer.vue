<template>
  <section aria-labelledby="flats" class="flat-list-container">
    <h1 id="flats" class="flat-list-container__title">Квартиры</h1>
    <slot />
  </section>
</template>

<style lang="scss">
  .flat-list-container {
    &__title {
      margin-bottom: fluid(48, 24);
    }
  }
</style>