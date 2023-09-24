export interface Resort {
  id?: number;
  name?: string;
  rating?: number | null;
  price_range?: string;
  createDate? : Date;
  description: string;
  image?: string;
  urlImage? : string
  address? : string;
  createBy?: string;
  isActive? : boolean;
  links? :string;
  location?: string;
  phoneNumber?: number;
  updateBy?: string;
  updateDate?: Date;
}
