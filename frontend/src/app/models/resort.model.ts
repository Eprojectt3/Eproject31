export interface Resort {
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
  urlImage?: string[];

  // quantityLimit?: number;
  // type?: boolean | false;
  // transportation?: string;
  // discount?: string;
}
