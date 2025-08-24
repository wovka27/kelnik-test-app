<script setup lang="ts">
  import { watch } from "vue";

  import QueryHelper from "#shared/QueryHelper";

  const filterStore = useFilterStore();
  const flatStore = useFlatStore();
  const router = useRouter()

  const isShowResetBtn = computed(() => !!QueryHelper.flatten(router.currentRoute.value.query).f);

  watch(
    () => router.currentRoute.value.query,
    async () => {
      flatStore.resetPage();
      await filterStore.fetchFilters();
    },
    { deep: true, immediate: true }
  );
</script>

<template>
  <aside class="filters">
    <div v-if="filterStore.loading" class="filters-inner filters-inner--skeleton"></div>
    <div v-else class="filters-inner">
      <UIToggleOptionsList v-model="filterStore.rooms" :options="filterStore.options.rooms" />
      <UIRangeSlider
        v-model="filterStore.priceRange"
        :max="filterStore.options.price[1]"
        :min="filterStore.options.price[0]"
        max-label="до"
        min-label="от"
        label="Стоимость квартиры, ₽"
      />
      <UIRangeSlider
        v-model="filterStore.squareRange"
        :max="filterStore.options.square![1]"
        :min="filterStore.options.square![0]"
        max-label="до"
        min-label="от"
        :step="0.1"
        label="Площадь, м²"
      />

      <button v-if="isShowResetBtn" class="filters__reset" @click="filterStore.resetFilters">
        Сбросить параметры
        <svg
          class=""
          viewBox="0 0 8.00012 8.00012"
          xmlns="http://www.w3.org/2000/svg"
          width="8.000122"
          height="8.000122"
          fill="none"
        >
          <rect width="8.000043" height="8.000118" x="0.000000" y="0.000000" />
          <path
            d="M3.99996 5.22229L1.37727 7.84498C1.12213 8.10013 0.641687 8.03336 0.304183 7.69586C-0.0333213 7.35836 -0.100086 6.87792 0.15506 6.62277L2.77775 4.00008L0.155017 1.37735C-0.100129 1.1222 -0.0333645 0.641762 0.30414 0.304258C0.641644 -0.0332461 1.12208 -0.100011 1.37723 0.155135L3.99996 2.77787L6.62282 0.155017C6.87796 -0.100129 7.3584 -0.0333648 7.6959 0.30414C8.03341 0.641644 8.10017 1.12208 7.84503 1.37723L5.22217 4.00008L7.84498 6.62289C8.10013 6.87804 8.03336 7.35847 7.69586 7.69598C7.35836 8.03348 6.87792 8.10025 6.62277 7.8451L3.99996 5.22229Z"
            fill="rgb(255,0,0)"
            fill-rule="evenodd"
          />
          <path
            d="M3.99996 5.22229L1.37727 7.84498C1.12213 8.10013 0.641687 8.03336 0.304183 7.69586C-0.0333213 7.35836 -0.100086 6.87792 0.15506 6.62277L2.77775 4.00008L0.155017 1.37735C-0.100129 1.1222 -0.0333645 0.641762 0.30414 0.304258C0.641644 -0.0332461 1.12208 -0.100011 1.37723 0.155135L3.99996 2.77787L6.62282 0.155017C6.87796 -0.100129 7.3584 -0.0333648 7.6959 0.30414C8.03341 0.641644 8.10017 1.12208 7.84503 1.37723L5.22217 4.00008L7.84498 6.62289C8.10013 6.87804 8.03336 7.35847 7.69586 7.69598C7.35836 8.03348 6.87792 8.10025 6.62277 7.8451L3.99996 5.22229Z"
            fill="rgb(11,23,57)"
            fill-rule="evenodd"
          />
        </svg>
      </button>
    </div>
  </aside>
</template>

<style lang="scss">
  .filters {
    position: relative;

    @media (width < rem(860)) {
      grid-column-start: 1;
      grid-column-end: 2;
      grid-row-start: 1;
      grid-row-end: 2;
    }

    &[inert] {
      filter: grayscale(1);
    }

    &__reset {
      border: none;
      color: inherit;
      background: none;
      display: flex;
      gap: 8px;
      align-items: center;
      font-size: rem(13);
      font-weight: 400;
      line-height: rem(18);

      @include hover {
        color: var(--color-green);
      }

      svg {
        fill: transparent;
      }
    }

    &-inner {
      position: sticky;
      top: rem(20);
      min-height: rem(256);
      display: flex;
      flex-direction: column;
      gap: 24px;
      border-radius: rem(10);
      background: linear-gradient(
        135deg,
        rgba(174.4506072998047, 227.8479766845703, 178.28672790527344, 0.3),
        rgba(149, 208, 161, 0.3) 100%
      );
      padding: rem(40);

      &--skeleton {
        width: 100%;
        min-height: 256px;
        padding: rem(40);
      }

      @include laptop {
        padding: rem(19) rem(20);

        &--skeleton {
          padding: rem(19) rem(20);
        }
      }
    }
  }
</style>
