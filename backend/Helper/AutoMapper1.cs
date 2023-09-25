using AutoMapper;
using backend.Dtos.CategoryDtos;
using backend.Dtos.LocationDtos;
using backend.Entity;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace backend.Helper
{
    public class AutoMapper1 : Profile
    {
        public AutoMapper1()
        {
            CreateMap<CategoryDtos, Category>().ReverseMap();
            CreateMap<Location1, LocationDtos>()
                .ForMember(l => l.State , otp => otp.MapFrom(o => o.State))
                .ReverseMap();

        }

    }
}
