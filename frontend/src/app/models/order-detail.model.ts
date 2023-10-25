import { TourDetail } from './tour-detail.model';
import { Transportation } from './transportation.model';

export interface OrderDetail {
  id?: number;
  orderID?: number;
  quantity?: number;
  price?: number;
  rating?: number;
  user_ID?: number;

  description?: string;
  tour_Detail_ID?: number;
  type_Payment?: string;
  payment_ID: string;
  createBy?: string;
  createDate?: Date;
  updateBy?: string;
  updateDate?: Date;
  isActive?: true;
  tourName?: string;
  range_time?: number;
  transportation?: Transportation;
  tourDetail?: TourDetail;
}
