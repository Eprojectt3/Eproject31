export interface AdminSidebar {
  icon: string;
  title: string;
  link: string;
}

export const adminSidebar: AdminSidebar[] = [
  {
    icon: 'person',
    title: 'User',
    link: '/admin/users',
  },
  {
    icon: 'category',
    title: 'Category',
    link: '/admin/categories',
  },
  {
    icon: 'flight_takeoff',
    title: 'Tours',
    link: '/admin/tours',
  },
  {
    icon: 'hotel',
    title: 'Hotels',
    link: '/admin/hotels',
  },
  {
    icon: 'restaurant',
    title: 'Restaurants',
    link: '/admin/restaurants',
  },
  {
    icon: 'villa',
    title: 'Resorts',
    link: '/admin/resorts',
  },
  {
    icon: 'splitscreen_left',
    title: 'Role',
    link: '/admin/roles',
  },
  {
    icon: 'directions_car',
    title: 'Transportation',
    link: '/admin/transportations',
  },
  {
    icon: 'room_service',
    title: 'Service',
    link: '/admin/services',
  },
  {
    icon: 'location_on',
    title: 'Location',
    link: '/admin/locations',
  },
  {
    icon: 'chat',
    title: 'Feedback',
    link: '/admin/feedbacks',
  },
  {
    icon: 'add_road',
    title: 'Itinerary',
    link: '/admin/itineraries',
  },
  {
    icon: 'shopping_cart',
    title: 'Order',
    link: '/admin/orders',
  },
  {
    icon: 'group',
    title: 'Staff',
    link: '/admin/staffs',
  },
];
