<template>
  <div class="section-main">
    <FlatList />
    <Filters />
  </div>
</template>

<style lang="scss">
  .section-main {
    display: grid;
    grid-template-columns: 1fr fluid(399, 318);
    grid-gap: fluid(80, 28);

    &__title {
      margin-bottom: fluid(48, 24);
    }

    @include tablet {
      grid-template-columns: 1fr rem(318);
    }

    @media (width < rem(860)) {
      grid-template-columns: 1fr;
    }
  }
</style>
