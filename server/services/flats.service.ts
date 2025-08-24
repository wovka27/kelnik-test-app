import { sortComparators } from "#shared/sortComparators";
import { QUERY_LIMIT_DEFAULT_VALUE, QUERY_PAGE_DEFAULT_VALUE } from "~~/constants/query";
import { getAllFlats } from "~~/server/repositories/flatRepository";
import type { Flat, FlatFilters, FlatSort } from "~~/server/types/flats";

export default class FlatsService {
  /** Получить все планировки */
  public getAll(): Promise<Flat[]> {
    return getAllFlats();
  }

  /** Пагинация + фильтры + сортировки */
  public async getPaginated(
    page = QUERY_PAGE_DEFAULT_VALUE,
    limit = QUERY_LIMIT_DEFAULT_VALUE,
    filters?: FlatFilters,
    sort?: FlatSort
  ): Promise<{ total: number; items: Flat[] }> {
    const flats = await this.getAll();

    const filtered = filters ? this.setFilters(filters, flats) : flats
    const sorted = sort ? this.applySort(sort, filtered) : filtered

    const total = sorted.length;
    const start = (page - 1) * limit;
    const end = start + limit;
    const items = sorted.slice(start, end);

    return { total, items };
  }

  public async getById(id: string): Promise<Flat | undefined> {
    const flats = await this.getAll();

    return flats.find((l) => l.id === id);
  }

  private setFilters(filters: FlatFilters, flats: Flat[]): Flat[] {
    return flats.filter((l) => {
      let valid = true;

      if (filters.rooms) valid = valid && filters.rooms.includes(l.rooms);
      if (filters.floor) valid = valid && l.floor === filters.floor;

      if (filters.price) {
        const [min, max] = filters.price;

        if (min) valid = valid && l.price >= min;
        if (max) valid = valid && l.price <= max;
      }

      if (filters.square) {
        const [min, max] = filters.square;

        if (min) valid = valid && l.square >= min;
        if (max) valid = valid && l.square <= max;
      }

      return valid;
    });
  }
  private applySort(sort: FlatSort, flats: Flat[]): Flat[] {
    const { key, order } = sort;
    const {string, number} = sortComparators

    return flats.toSorted(({ [key]: a }, {[key]: b }) => {
      if (a === b) return 0;

      if (typeof a === "string" && typeof b === "string") return string[order](a, b);

      return number[order](Number(a), Number(b));
    });
  }
}

