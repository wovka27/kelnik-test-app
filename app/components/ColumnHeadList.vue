<script setup lang="ts">
  import QueryHelper from "#shared/QueryHelper";
  import type { OrderType } from "~/types/order";

  interface ColumnHeadListItem {
    title: string;
    key?: string;
    sorted?: boolean;
  }

  interface ColumnHeadListProps {
    data: ColumnHeadListItem[];
  }

  defineProps<ColumnHeadListProps>();
  const router = useRouter();

  const handleSort = (value: Record<string, OrderType>) => {
    const [k, v] = Object.entries(value)[0]!;

    router.replace({
      query: QueryHelper.toQueryRecord({
        ...router.currentRoute.value.query,
        sort: {
          key: v ? k : v,
          order: v
        }
      }),
    });
  };
</script>

<template>
  <div class="column-head-list">
    <ColumnHead
      v-for="head of data"
      :key="head.title"
      :sort-key="head.key"
      :title="head.title"
      :sorted="head.sorted"
      @update:model-value="handleSort"
    />
  </div>
</template>

<style lang="scss">
  .column-head-list {
    margin-bottom: 10px;
    display: grid;
    padding: rem(16) 0 rem(16) rem(24);
    grid-template-columns: rem(80) 1fr repeat(3, rem(120));
    gap: rem(20);
    box-shadow: 0 rem(1) 0 0 rgba(0, 0, 0, 0.1);
    background: var(--color-light);

    @include tablet {
      display: flex;
      padding: rem(8) 0;
      box-shadow: none;
    }
  }
</style>
