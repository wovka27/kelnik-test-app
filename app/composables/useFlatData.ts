export const useFlatData = () => {
  const route = useRoute();

  const {data: item, error} = useFetch(`/api/flats/${route.params.id}`)

  if (error.value) showError(error.value)

  return { item };
};
