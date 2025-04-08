export interface FilterProducts {
  category: string[];
  rateAvg: number[];
  keyword: string;
  'price[gte]': number;
  'price[lte]': number;
}
