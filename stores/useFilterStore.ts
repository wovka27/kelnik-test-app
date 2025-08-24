import QueryHelper from "#shared/QueryHelper";
import type { FlatFilters, WithFilters } from "~~/server/types/flats";

export const useFilterStore = defineStore("filter", () => {
  const router = useRouter();

  const { toQueryRecord, flatten } = QueryHelper;

  const loading = ref<boolean>(true);

  const options = ref<
    Pick<Required<FlatFilters>, "square" | "price"> & {
      rooms: { label: string; value: number; disabled: boolean }[];
    }
  >({
    price: [1000000, 10000000],
    square: [10, 50],
    rooms: [],
  });

  const rooms = computed({
    get: () => {
      const query = flatten(router.currentRoute.value.query) as WithFilters;

      return query.f?.rooms || [];
    },
    set: (newValue) => {
      const query = flatten(router.currentRoute.value.query);

      router.replace({ query: toQueryRecord(setFilterQueryData(query, "rooms", newValue)) });
    },
  });

  const squareRange = computed({
    get: () => {
      const query = flatten(router.currentRoute.value.query) as WithFilters;

      return query.f?.square ?? options.value.square;
    },
    set: (newValue) => {
      const query = flatten(router.currentRoute.value.query);
      router.replace({ query: toQueryRecord(setFilterQueryData(query, "square", newValue)) });
    },
  });

  const priceRange = computed({
    get: () => {
      const query = flatten(router.currentRoute.value.query) as WithFilters;

      return query.f?.price ?? options.value.price;
    },
    set: (newValue) => {
      const query = flatten(router.currentRoute.value.query);
      router.replace({ query: toQueryRecord(setFilterQueryData(query, "price", newValue)) });
    },
  });

  const fetchFilters = async () => {
    try {
      const response = await $fetch("/api/filters", { query: flatten(router.currentRoute.value.query) });

      if (!response) return;

      options.value = {
        price: response.prices,
        rooms: response.rooms,
        square: response.squares,
      };
    } finally {
      loading.value = false;
    }
  };

  const resetFilters = async () => {
    await router.replace({ query: {} });
    await fetchFilters()
  };

  return {
    rooms,
    squareRange,
    priceRange,
    options,
    loading,
    fetchFilters,
    resetFilters,
  };
});

const setFilterQueryData = <Q, K extends keyof Q, V>(query: Q, key: K, value: V) => {
  return { ...query, f: { ...query["f" as keyof Q], [key]: value } };
};
