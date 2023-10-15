export interface Order {
  id?: number;
  price?: number;
  number_people?: number;
  tour_Detail_ID?: number;
  createBy?: string;
  createDate?: Date;
  updateBy?: string;
  updateDate?: Date;
  isActive?: boolean;
}
