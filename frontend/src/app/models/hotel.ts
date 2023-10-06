export interface Hotel {
    id?: number;
    name?: string;
    rating?: number | null;
    price_range?: string;
    createDate?: Date;
    description: string;
    image?: string;
    imageDetail?: string;
    address?: string;
    createBy?: string;
    isActive?: boolean;
    intineraries?: any;
    links?: string;
    location1?: any;
    locationId?: number;
    phoneNumber?: number;
    updateBy?: string;
    updateDate?: Date;
    urlImage?: string[]

    // quantityLimit?: number;
    // type?: boolean | false;
    // transportation?: string;
    // discount?: string;
}

// export const hotels: Hotel[] = [
//   {
//     id: 1,
//     Name: 'Ha Long Bay',
//     price_range: 1000,
//     date: 'April 6, 2023',
//     description:
//       'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sollicitudin, tellus vitae condimentum egestas, libero dolor auctor tellus, eu consectetur neque elit quis nunc. Cras elementum pretium est. Lorem ipsum dolor sit amet, consectetur adipiscing elit.Cras sollicitudin, tellus vitae condimentum egestas, libero dolor auctor tellus, eu consectetur neque elit quis nunc.Cras elementum pretium est.',
//     image: '../../assets/images/Rectangle 19377.jpg',
//     quantityLimit: 40,
//     rating: 5,
//     type: false,
//     transportation: 'plane',
//     discount: '20%',
//   },

