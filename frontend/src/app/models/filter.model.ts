export interface Filter {
  name: string;
}

export const filter: Filter[] = [
  { name: 'All' },
  { name: 'Newest' },
  { name: 'Price High-Low' },
  { name: 'Price Low-High' },
];
