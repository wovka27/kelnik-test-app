import QueryHelper from "#shared/QueryHelper";
import { QUERY_LIMIT_DEFAULT_VALUE, QUERY_PAGE_DEFAULT_VALUE } from "~~/constants/query";
import type { Flat } from "~~/server/types/flats";

export const useFlatStore = defineStore("flat", () => {
  const router = useRouter();

  const items = ref<Flat[]>([]);
  const total = ref(0);
  const page = ref<number>(QUERY_PAGE_DEFAULT_VALUE);
  const loading = ref<boolean>(true);

  const isLoadMore = computed(() => items.value.length < total.value);

  const resetPage = () => {
    page.value = QUERY_PAGE_DEFAULT_VALUE;
  };

  const fetchFlats = async (append?: boolean) => {
    loading.value = true;

    try {
      const response = await $fetch("/api/flats", {
        query: QueryHelper.flatten({
          ...router.currentRoute.value.query,
          page: page.value,
          limit: QUERY_LIMIT_DEFAULT_VALUE,
        }),
      });

      if (!response) return;

      total.value = response.total;

      if (append) {
        items.value.splice(items.value.length, 0, ...response.items);
        return;
      }

      items.value = response.items;
    } finally {
      loading.value = false;
    }
  };

  const loadMore = async () => {
    if (total.value < items.value.length) return;

    page.value++;

    await fetchFlats(true);
  };

  return {
    items,
    total,
    loading,

    isLoadMore,

    fetchFlats,
    loadMore,
    resetPage,
  };
});
