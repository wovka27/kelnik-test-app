<template>
  <div class="card">
    <div class="card__content">
      <div v-for="n of [40,60,40]" :key="n" class="skeleton skeleton--line" :class="`skeleton--w-${n}`"></div>
    </div>
    <div class="skeleton skeleton--avatar"></div>
  </div>
</template>

<style lang="scss">
  :root {
    --sk-bg: #e9ecef; // базовый цвет скелетона
    --sk-shimmer: #f5f6f7; // блик
    --sk-radius: 12px; // общий радиус
    --sk-speed: 1.25s; // скорость анимации
  }

  .card {
    display: flex;
    gap: 16px;
    padding: 16px;
    border-radius: 16px;
    background: #fff;
    min-height: 76px;
    box-shadow:
      0 1px 3px rgba(0, 0, 0, 0.06),
      0 2px 8px rgba(0, 0, 0, 0.06);

    &__content {
      flex: 1;
      display: grid;
      gap: 10px;
      align-content: start;
    }
  }

  .grid {
    display: grid;
    gap: 16px;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  }

  .skeleton {
    position: relative;
    overflow: hidden;
    display: inline-block;
    background-color: var(--sk-bg);
    border-radius: var(--sk-radius);

    &::after {
      content: "";
      position: absolute;
      inset: 0;
      transform: translateX(-100%);
      background-image: linear-gradient(
        90deg,
        rgba(255, 255, 255, 0) 0%,
        var(--sk-shimmer) 50%,
        rgba(255, 255, 255, 0) 100%
      );
      animation: shimmer var(--sk-speed) infinite;
    }

    &--line {
      height: 12px;
      width: 100%;
    }

    &--avatar {
      width: 56px;
      height: 56px;
      border-radius: 10%;
      flex: 0 0 56px;
    }

    &--media {
      width: 100%;
      aspect-ratio: 16/9;
      border-radius: 12px;
      display: block;
    }

    &--w-90 {
      width: 90%;
    }

    &--w-80 {
      width: 80%;
    }

    &--w-70 {
      width: 70%;
    }

    &--w-60 {
      width: 60%;
    }

    &--w-50 {
      width: 50%;
    }

    &--w-40 {
      width: 40%;
    }

    &--w-30 {
      width: 30%;
    }

    &--pill {
      border-radius: 999px;
    }

    &--circle {
      border-radius: 50%;
    }
  }

  @keyframes shimmer {
    100% {
      transform: translateX(100%);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .skeleton::after {
      animation: none;
    }
  }
</style>
