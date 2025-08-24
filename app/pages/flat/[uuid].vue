<script setup lang="ts">
  import { useFlatData } from "~/composables/useFlatData";

  const router = useRouter()
  const { item } = useFlatData();

  const detailList = computed(() => item.value ? [
    {label: 'Комнат:',value: item.value.rooms},
    {label: 'Площадь:',value: item.value.square + ' м²'},
    {label: 'Этаж:',value: `${ item.value.floor } из ${ item.value.totalFloors }`},
    {label: 'Цена:',value: item.value.price.toLocaleString("fr")},
  ] : [])
</script>

<template>
  <div v-if="item" class="flat-detail">
    <div class="flat-detail__container">
      <div class="flat-detail__image">
        <img
          src="/images/plan.svg"
          :alt="`Планировка квартиры ${item.apartmentNumber}`"
          class="flat-detail__image-main"
        />
      </div>

      <div class="flat-detail__info">
        <h1 class="flat-detail__title">Квартира №{{ item.apartmentNumber }}</h1>

        <div class="flat-detail__grid">
          <div v-for="(item, index) of detailList" :key="index" class="flat-detail__item">
            <span class="flat-detail__label">{{item.label}}</span>
            <span class="flat-detail__value">{{ item.value }}</span>
          </div>
        </div>

        <div v-if="item.description" class="flat-detail__description">
          <h2 class="flat-detail__subtitle">Описание</h2>
          <p>{{ item.description }}</p>
        </div>

        <button class="btn" @click="router.back"> Назад </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .flat-detail {
    &__container {
      margin: 0 auto;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 40px;

      @include mobile {
        grid-template-columns: 1fr;
      }
    }

    &__image {
      position: relative;
      border-radius: 8px;
      overflow: hidden;

      &-main {
        width: 100%;
        height: auto;
        object-fit: contain;
        display: block;
      }

      &-placeholder {
        width: 100%;
        height: 400px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #e5e5e5;
        color: #666;
        font-size: 18px;
      }
    }

    &__title {
      font-size: 32px;
      margin-bottom: 24px;
      color: #1a1a1a;
    }

    &__grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 20px;
      margin-bottom: 32px;
    }

    &__item {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    &__label {
      font-size: 16px;
      color: #666;
    }

    &__value {
      font-size: 18px;
      font-weight: 500;
      color: #1a1a1a;

      &.flat-detail__price {
        color: #2ecc71;
        font-weight: 600;
      }
    }

    &__description {
      margin-bottom: 32px;

      p {
        line-height: 1.6;
        color: #333;
      }
    }

    &__subtitle {
      font-size: 24px;
      margin-bottom: 16px;
      color: #1a1a1a;
    }
  }
</style>
