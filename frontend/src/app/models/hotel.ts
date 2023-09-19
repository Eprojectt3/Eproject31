export interface Hotel {
  id?: number;
  name?: string;
  price?: number;
  date?: string;
  description: string;
  image?: string;
  quantityLimit?: number;
  rating?: number | null;
  type?: boolean | false;
  transportation?: string;
  discount?: string;
}
export const hotels: Hotel[] = [
  {
    id: 1,
    name: 'Ha Long Bay',
    price: 1000,
    date: 'April 6, 2023',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sollicitudin, tellus vitae condimentum egestas, libero dolor auctor tellus, eu consectetur neque elit quis nunc. Cras elementum pretium est. Lorem ipsum dolor sit amet, consectetur adipiscing elit.Cras sollicitudin, tellus vitae condimentum egestas, libero dolor auctor tellus, eu consectetur neque elit quis nunc.Cras elementum pretium est.',
    image: '../../assets/images/Rectangle 19377.jpg',
    quantityLimit: 40,
    rating: 5,
    type: false,
    transportation: 'plane',
    discount: '20%',
  },
]
