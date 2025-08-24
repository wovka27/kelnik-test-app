<script setup lang="ts">
  import type { OrderType } from "~/types/order";

  interface ColumnHeadProps {
    title: string;
    sorted?: boolean;
    sortKey?: string;
  }

  const props = defineProps<ColumnHeadProps>();

  const model = defineModel<Record<string, OrderType>>();

  const index = ref(0);

  const orderTypes: OrderType[] = [undefined, "desc", "asc"];

  const changeSortType = () => {
    index.value = (index.value + 1) % orderTypes.length;

    model.value = {
      [props.sortKey as string]: orderTypes[index.value],
    };
  };
</script>

<template>
  <div class="column-head" :class="{ sorted }" @click="changeSortType">
    <p class="column-head__title">{{ title }}</p>
    <div v-if="sorted" class="column-head__arrows">
      <svg
        v-for="n of 2"
        :key="n"
        class="column-head__arrow"
        :class="{ 'is-active': index === n && orderTypes[n] }"
        viewBox="0 0 6.85715 4"
        xmlns="http://www.w3.org/2000/svg"
        width="6.857147"
        height="4.000000"
        fill="none"
      >
        <rect
          width="6.857143"
          height="4.000000"
          x="0.000000"
          y="0.000000"
          transform="matrix(-1,8.74228e-08,-8.74228e-08,-1,6.85712,4)"
        />
        <path
          d="M2.82265 3.7465C2.98491 3.91016 3.19917 4 3.42886 4C3.65797 4 3.87337 3.91016 4.0345 3.7465L6.68959 0.987232C6.91299 0.761203 6.91299 0.395551 6.68959 0.169522C6.46676 -0.0565073 6.10509 -0.0565073 5.88169 0.169522L3.42886 2.72451L0.97545 0.169522C0.752049 -0.0565073 0.390951 -0.0565073 0.16755 0.169522C-0.0558502 0.395551 -0.0558502 0.761203 0.16755 0.987232L2.82265 3.7465Z"
          opacity="0.400000006"
          fill="rgb(255,0,0)"
          fill-rule="evenodd"
          transform="matrix(-1,8.74228e-08,-8.74228e-08,-1,6.85712,4)"
        />
        <path
          d="M2.82265 3.7465C2.98491 3.91016 3.19917 4 3.42886 4C3.65797 4 3.87337 3.91016 4.0345 3.7465L6.68959 0.987232C6.91299 0.761203 6.91299 0.395551 6.68959 0.169522C6.46676 -0.0565073 6.10509 -0.0565073 5.88169 0.169522L3.42886 2.72451L0.97545 0.169522C0.752049 -0.0565073 0.390951 -0.0565073 0.16755 0.169522C-0.0558502 0.395551 -0.0558502 0.761203 0.16755 0.987232L2.82265 3.7465Z"
          opacity="0.400000006"
          fill="rgb(11,23,57)"
          fill-rule="evenodd"
          transform="matrix(-1,8.74228e-08,-8.74228e-08,-1,6.85712,4)"
        />
      </svg>
    </div>
  </div>
</template>

<style lang="scss">
  .column-head {
    max-height: max-content;
    display: flex;
    gap: rem(8);
    align-items: center;
    user-select: none;

    font-size: rem(14);
    font-weight: 400;
    line-height: rem(20);

    @include tablet {
      &:not(.sorted) {
        display: none;
      }
    }

    @include hover {
      &.sorted {
        cursor: pointer;

        .column-head__title {
          font-weight: 500;
          color: var(--color-green);
        }
      }
    }

    &__title {
      transition-property: color;
    }

    &__arrows {
      display: flex;
      flex-direction: column;
      gap: rem(2);
    }

    &__arrow {
      fill: var(--color-light);

      &:last-child {
        rotate: 180deg;
      }

      &.is-active {
        path {
          fill: var(--color-green);
        }
      }
    }
  }
</style>
