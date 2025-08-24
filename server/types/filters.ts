export interface FiltersResponse {
  rooms: {
    value: number;
    label: string;
    disabled: boolean;
  }[];
  squares: [number, number];
  prices: [number, number];
}
