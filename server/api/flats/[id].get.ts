import FlatsService from "~~/server/services/flats.service";
import type { Flat } from "~~/server/types/flats";

export default defineEventHandler<Promise<Flat>>(async (event) => {
  const service = new FlatsService();

  const id = event.context.params?.id;
  const flat = await service.getById(id!);

  if (!flat) throw createError({ statusCode: 404, statusMessage: "Flats not found" });

  return flat;
});
