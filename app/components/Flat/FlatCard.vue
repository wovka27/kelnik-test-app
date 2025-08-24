<script setup lang="ts">
  import type { Flat } from "~~/server/types/flats";

  interface FlatCardProps {
    data: Flat;
  }

  const props = defineProps<FlatCardProps>();

  const cost = computed(() => props.data.price?.toLocaleString("fr"));
</script>

<template>
  <article class="flat-card">
    <div class="flat-card__img">
      <img width="80" height="80" src="/images/plan.svg" :alt="`Планировка квартиры ${data.apartmentNumber}`" />
    </div>
    <div class="flat-card__content">
      <NuxtLink :to="`/flat/${data.id}`" class="flat-card__name">
        <strong> {{ data.rooms }}-комнатная №{{ data.apartmentNumber }} </strong>
      </NuxtLink>
      <div class="flat-card__square">{{ data.square }}</div>
      <div class="flat-card__floor">
        {{ data.floor }}<span>&nbsp;из&nbsp;{{ data.totalFloors }}</span>
      </div>
      <div class="flat-card__cost">{{ cost }}</div>
    </div>
  </article>
</template>

<style lang="scss">
  .flat-card {
    display: grid;
    padding: rem(16) 0 rem(16) rem(24);
    grid-template-columns: rem(80) 1fr repeat(3, rem(120));
    gap: rem(20);
    box-shadow: 0 rem(1) 0 0 rgba(0, 0, 0, 0.1);
    background: var(--color-light);

    &__floor {
      span {
        opacity: 0.5;
      }
    }

    &__content {
      display: contents;
    }

    &__name {
      transition-property: color;
      height: max-content;

      @include hover {
        color: var(--color-green);
      }
    }

    @include tablet {
      padding: rem(16) rem(24);
      border: rem(1) solid #00000010;
      border-radius: rem(8);
      grid-template-columns: 1fr 1fr;

      &__floor {
        white-space: nowrap;
        span {
          &::after {
            content: " этаж";
          }
        }
      }

      &__square {
        white-space: nowrap;
        &::after {
          content: " м²";
        }
      }

      &__img {
        justify-self: end;
        grid-column-start: 2;
        grid-column-end: 3;
        grid-row-start: 1;
        grid-row-end: 2;
      }

      &__content {
        display: grid;
        gap: rem(20);
        grid-template-columns: repeat(3, 1fr);
      }

      &__name {
        color: inherit;
        grid-column: span 3;
      }
    }
  }
</style>
