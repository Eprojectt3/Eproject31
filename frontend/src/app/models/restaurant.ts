
export interface Restaurant {
  id?: number;
  name?: string;
  rating?: number | null;
  price_range?: string;
  createDate? : Date;
  description: string;
  image?: string;
  imageDetail?: string;
  address? : string;
  createBy?: string;
  isActive? : boolean;
  intineraries?: any;
  links? :string;
  location1? :any;
  locationId?: number;
  phoneNumber?: number;
  updateBy?: string;
  updateDate?: Date;
}
