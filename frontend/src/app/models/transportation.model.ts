export interface Transportation {
  id?: number;
  name?: string;
  price?: number;
  description?: string;
  tour_ID?: number;
  tours?: any;
  createBy?: string;
  createDate?: Date;
  updateBy?: string;
  updateDate?: Date;
  isActive?: boolean;
}
