export interface Itinerary {
  id?: number;
  tourID?: number;
  tour?: any;
  sequence?: number;
  description?: string;
  startTime?: Date;
  endTime?: Date;
  type?: string;
  hotelId?: number;
  hotel?: any;
  restaurantID?: number;
  restaurant?: any;
  resortID?: number;
  resorts?: any;
  createBy?: string;
  createDate?: Date;
  updateBy?: string;
  updateDate?: Date;
  isActive?: boolean;
}
