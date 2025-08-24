<script setup lang="ts">
  const isHidden = ref<boolean>(true);

  const clickButton = () =>
    scrollTo({
      top: 0,
      behavior: "smooth",
    });

  const handleScroll = () => {
    isHidden.value = !(window.scrollY <= 100);
  };

  onMounted(() => {
    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true });
  });

  onUnmounted(() => {
    window.removeEventListener("scroll", handleScroll);
  });
</script>

<template>
  <button  class="scroll-to-top-button" :class="{ 'is-hidden': !isHidden }" @click="clickButton">
    <span class="visually-hidden">Конопка скролла в начало страницы</span>
    <svg
      viewBox="0 0 10.0095 14.4141"
      xmlns="http://www.w3.org/2000/svg"
      width="10.009460"
      height="14.414093"
      fill="none"
    >
      <path
        d="M12 4.00063L0 4.00063M4 8.00126L0 4.00063L4 0"
        stroke="#FFFFFF"
        stroke-linecap="round"
        stroke-width="2"
        transform="matrix(1.19249e-08,1,-1,1.19249e-08,9.00536,1.41409)"
      />
    </svg>
  </button>
</template>

<style lang="scss">
  .scroll-to-top-button {
    @include square(40px);
    @include flex-center();

    position: fixed;
    bottom: rem(32);
    right: rem(32);
    border: 1px solid transparent;
    border-radius: 50%;
    color: var(--color-light);
    background-color: var(--color-green);
    transition-property: border-color, scale;

    path {
      transition-property: stroke;
    }
    svg {
      fill: var(--color-green);
      transition-property: fill;
    }

    @include hover {
      background-color: var(--color-light);
      border-color: var(--color-green);

      svg {
        fill: var(--color-light);
      }

      path {
        stroke: var(--color-green) !important;
      }
    }

    &.is-hidden {
      scale: 0;
    }
  }
</style>
