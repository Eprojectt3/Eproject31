export interface Order {
  revenue(revenue: any): unknown;
  month(month: any): unknown;
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
