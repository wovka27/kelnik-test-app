<script setup lang="ts">
  import { watch } from "vue";

  import EmptyFlatList from "~/components/Flat/EmptyFlatList.vue";

  const router = useRouter();
  const flatStore = useFlatStore();

  const isShowSkeleton = ref<boolean>(false);

  const headList = [
    { title: "Планировка" },
    { title: "Квартира" },
    { title: "S, м²", key: "square", sorted: true },
    { title: "Этаж", key: "floor", sorted: true },
    { title: "Цена, ₽", key: "price", sorted: true },
  ];

  const clickLoadMore = () => {
    isShowSkeleton.value = true;

    flatStore.loadMore().finally(() => {
      isShowSkeleton.value = false;
    });
  };

  watch(
    () => router.currentRoute.value.query,
    () => {
      flatStore.fetchFlats();
    },
    { immediate: true, deep: true }
  );
</script>

<template>
  <div class="flat-cards">
    <ColumnHeadList v-if="flatStore.items.length" :data="headList" />
    <div class="flat-cards-inner">
      <template v-if="!flatStore.items.length && flatStore.loading">
        <UISkeleton v-for="n of 5" :key="n" />
      </template>
      <template v-else-if="!flatStore.items.length && !flatStore.loading">
        <EmptyFlatList title="Нет доступных планировок" description="Попробуйте изменить фильтры или вернуться позже" />
      </template>
      <template v-else>
        <FlatCard v-for="flat of flatStore.items" :key="flat.id" :data="flat" />
      </template>
      <template v-if="isShowSkeleton">
        <UISkeleton v-for="n of 5" :key="n" />
      </template>
    </div>
    <button v-if="flatStore.items.length && flatStore.isLoadMore" class="btn" @click="clickLoadMore">
      Загрузить еще
    </button>
  </div>
</template>

<style lang="scss">
  .flat-cards {
    &-inner {
      margin-bottom: rem(48);
      display: flex;
      flex-direction: column;
      gap: rem(16);

      @include tablet {
        gap: rem(4);
      }
    }
  }
</style>
