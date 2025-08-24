import type { LocationQuery } from "#vue-router";

export interface Flat {
  id: string;
  rooms: number;
  square: number;
  floor: number;
  totalFloors: number;
  price: number;
  image?: string;
  apartmentNumber: number;
  description?: string;
}

export interface Pagination {
  total: number;
  page: number;
  pages: number;
  limit: number;
}

export type FlatFilters = Partial<{
  page: number;
  limit: number;
  rooms: number[];
  floor: number;
  price: [number, number];
  square: [number, number];
}>;

export interface FlatSort {
  key: keyof Flat;
  order: "asc" | "desc";
}

export type WithFilters = LocationQuery & { f: FlatFilters };
