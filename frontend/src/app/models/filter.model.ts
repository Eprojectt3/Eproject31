export interface Filter {
  name: string;
  value:string
}

export const filter: Filter[] = [
  { name: 'Month', value: 'month' },
  { name: 'Year', value: 'year' },
  { name: 'Day',value:'day' }
];
export const monthss: Filter[]=[
  { name: 'Tháng 1', value: '1' },
  { name: 'Tháng 2', value: '2' },
  { name: 'Tháng 3', value: '3' },
  { name: 'Tháng 4', value: '4' },
  { name: 'Tháng 5', value: '5' },
  { name: 'Tháng 6', value: '6' },
  { name: 'Tháng 7', value: '7' },
  { name: 'Tháng 8', value: '8' },
  { name: 'Tháng 9', value: '9' },
  { name: 'Tháng 10', value: '10' },
  { name: 'Tháng 11', value: '11' },
  { name: 'Tháng 12', value: '12' },
]

