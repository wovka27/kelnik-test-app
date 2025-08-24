import QueryHelper from "#shared/QueryHelper";
import FlatsService from "~~/server/services/flats.service";
import type { FiltersResponse } from "~~/server/types/filters";
import type { Flat, FlatFilters } from "~~/server/types/flats";

export default defineEventHandler(async (event): Promise<FiltersResponse> => {
  const query = getQuery(event);
  const service = new FlatsService();

  const filters = QueryHelper.flatten(JSON.parse(query.f as string || '{}'));

  const allFlats = await service.getAll();

  const flatsExceptRooms = applyFilters(allFlats, { ...filters, rooms: undefined });
  const allRooms = uniqueSorted(allFlats.map((i) => i.rooms));

  const rooms = allRooms.map((room) => ({
    value: room,
    label: `${room}K`,
    disabled: !flatsExceptRooms.some((f) => f.rooms === room),
  }));

  const flatsExceptSquare = applyFilters(allFlats, { ...filters, square: undefined });
  const squares = range(flatsExceptSquare.map((i) => i.square));

  const flatsExceptPrice = applyFilters(allFlats, { ...filters, price: undefined });
  const prices = range(flatsExceptPrice.map((i) => i.price));

  return { rooms, squares, prices };
});

function applyFilters(flats: Flat[], filters: FlatFilters): Flat[] {
  return flats.filter((l) => {

    if (Array.isArray(filters.price)) {
      const [min, max] = normalizeRange(filters.price);
      if (min !== undefined && !isNaN(min) && l.price <= min) return false;
      if (max !== undefined && !isNaN(max) && l.price >= max) return false;
    }

    if (Array.isArray(filters.square)) {
      const [min, max] = normalizeRange(filters.square);
      if (min !== undefined && !isNaN(min) && l.square <= min) return false;
      if (max !== undefined && !isNaN(max) && l.square >= max) return false;
    }

    if (filters.rooms && Array.isArray(filters.rooms)) {
      if (!filters.rooms.includes(Number(l.rooms))) return false;
    }

    return true;
  });
}

function normalizeRange([a, b]: Array<number | undefined>): [number | undefined, number | undefined] {
  if (a === undefined && b === undefined) return [undefined, undefined];
  if (a !== undefined && b !== undefined && a > b) return [b, a];
  return [a, b];
}

function range(values: number[]): [number, number] {
  if (!values || values.length === 0) return [0, 0];
  return [Math.min(...values), Math.max(...values)];
}

function uniqueSorted(nums: number[]) {
  return Array.from(new Set(nums)).sort((a, b) => a - b);
}
