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
  location?: string;
  locationId?: number;
  phoneNumber?: string;
  updateBy?: string;
  updateDate?: Date;
  urlImage?: any[];

  // quantityLimit?: number;
  // type?: boolean | false;
  // transportation?: string;
  // discount?: string;
}
