import type { Flat } from "~~/server/types/flats";

export const useFlatData = () => {
  const route = useRoute();
  const item = ref<Flat>();

  const fetchData = async () => {
      try {
        const data = await $fetch(`/api/flats/${route.params.uuid}`);
        item.value = data;

      } catch (error) {
        showError(error)
      }
  }

  fetchData();

  return { item };
};
