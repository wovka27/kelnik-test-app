import { QUERY_LIMIT_DEFAULT_VALUE, QUERY_PAGE_DEFAULT_VALUE } from "~~/constants/query";
import FlatsService from "~~/server/services/flats.service";
import type { FlatFilters, FlatSort } from "~~/server/types/flats";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const service = new FlatsService();

  const page = Number(query.page || QUERY_PAGE_DEFAULT_VALUE);
  const limit = Number(query.limit || QUERY_LIMIT_DEFAULT_VALUE);

  const filters: FlatFilters = {};

  if (query.f) {
    Object.entries(JSON.parse(query.f as string)).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        filters[key] = value.map(Number);
      } else {
        const parsedInt = parseInt((value as string) || "");
        filters[key] = isNaN(parsedInt) ? value : parsedInt;
      }
    });
  }

  const sort = query.sort ? JSON.parse(String(query.sort)) : null;

  return await service.getPaginated(page, limit, filters, sort as FlatSort);
});
