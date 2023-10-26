using AutoMapper;
using backend.Dtos.CategoryDtos;
using backend.Dtos.FeedBackDtos;
using backend.Dtos.HotelDtos;
using backend.Dtos.ItineraryDtos;
using backend.Dtos.LocationDtos;
using backend.Dtos.OrderDetaiDtos;
using backend.Dtos.OrderDtos;
using backend.Dtos.PaymentDtos;
using backend.Dtos.ResortDtos;
using backend.Dtos.RestaurantDtos;
using backend.Dtos.ServiceDtos;
using backend.Dtos.StaffDtos;
using backend.Dtos.TourDetailDtos;
using backend.Dtos.TourDtos;
using backend.Dtos.TransportationDtos;
using backend.Dtos.UserDto;
using backend.Entity;

namespace backend.Helper
{
    public class AutoMapper1 : Profile
    {
        public AutoMapper1()
        {
            CreateMap<CategoryDtos, Category>().ReverseMap();
            CreateMap<Location1, LocationDtos>()
                .ForMember(l => l.State, otp => otp.MapFrom(o => o.State))
                .ReverseMap();
            CreateMap<Place, PlaceDto>()
                .ForMember(h => h.Location, otp => otp.MapFrom(o => o.location1.State))
                .ReverseMap();
            CreateMap<PlaceImageDto, Place>().ReverseMap();
            CreateMap<UserDto, User>().ReverseMap();

            CreateMap<Staff, StaffDto>().ReverseMap();
            CreateMap<StaffImageDto, Staff>().ReverseMap();

            CreateMap<TourDto, Tour>().ReverseMap();
            CreateMap<FeedBack, FeedBackDto>().ReverseMap();

            CreateMap<Itinerary, ItineraryDto>()
              .ForMember(i => i.Tour_Name, otp => otp.MapFrom(o => o.tour.Name))
             .ForMember(i => i.Type, otp => otp.MapFrom(o => o.PlaceType.Name))
             .ForMember(i => i.PlaceName, otp => otp.MapFrom(o => o.hotel.Name));

            CreateMap<Service, ServiceDto>()
                .ForMember(s => s.Tour_Name, otp => otp.MapFrom(o => o.Tour.Name));
            //CreateMap<Tour, TourDto>()
            //    .ForMember(s => s.Category_Name, otp => otp.MapFrom(o => o.category.Name));
            CreateMap<TourDetail, TourDetailDto>()
                .ForMember(s => s.Tour_Name, otp => otp.MapFrom(o => o.tour.Name));
            CreateMap<OrderDetail, OrderDetailDto>()
                .ForMember(s => s.User_Name, otp => otp.MapFrom(o => o.Users.Name));

            CreateMap<Tour_Detail_PaymentPaypal_Dto, TourDetail>().ReverseMap();
            CreateMap<Tour, TourPageDto>()
                .ForMember(s => s.category_Name, otp => otp.MapFrom(o => o.category.Name))
                .ForMember(
                    s => s.Transportation_Name,
                    otp => otp.MapFrom(o => o.transportation.Name)
                );
            CreateMap<Transportation, TransportationDto>().ReverseMap();
            CreateMap<Order, OrderDtos>().ReverseMap();
            CreateMap<OrderDetail, OrderDetailWithTourDto>()
                .ForMember(i => i.TourName, otp => otp.MapFrom(a => a.TourDetails.TourId))
                .ForMember(s => s.User_Name, otp => otp.MapFrom(o => o.Users.Name));
        }
    }
}
