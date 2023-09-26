
using AutoMapper;
using backend.Dtos.CategoryDtos;
using backend.Dtos.HotelDtos;
using backend.Dtos.LocationDtos;
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
            CreateMap<Hotel, HotelDto>()
                .ForMember(h => h.Location, otp => otp.MapFrom(o => o.location1.State))
                .ReverseMap();
            CreateMap<Resorts, Dtos.ResortDtos.ResortDto>()
                .ForMember(h => h.Location, otp => otp.MapFrom(o => o.Location.State))
                .ReverseMap();




        }
    }
}
