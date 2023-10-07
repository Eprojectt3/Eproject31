export interface Service {
  id?: number;
  name?: string;
  description?: string;
  tour_ID?: number;
  tour?: any;
  createBy?: string;
  createDate?: Date;
  updateBy?: string;
  updateDate?: Date;
  isActive?: boolean;
}
