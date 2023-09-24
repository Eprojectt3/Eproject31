using AutoMapper;
using backend.Dtos.CategoryDtos;
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 64a5e53 (son create route for information page)

using backend.Dtos.HotelDtos;
using backend.Dtos.LocationDtos;
using backend.Dtos.ResortDtos;


<<<<<<< HEAD
=======
=======
using backend.Dtos.PaymentDtos;
>>>>>>> 16175b6 (haidang)
>>>>>>> 64a5e53 (son create route for information page)
using backend.Entity;
using System.Globalization;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace backend.Helper
{
    public class AutoMapper1 : Profile
    {
        public AutoMapper1()
        {
            CreateMap<CategoryDtos, Category>().ReverseMap();
<<<<<<< HEAD
            CreateMap<Location1, LocationDtos>()
                .ForMember(l => l.State , otp => otp.MapFrom(o => o.State))
                .ReverseMap();
            CreateMap<Hotel,HotelDto>()
                .ForMember(h => h.Location, otp => otp.MapFrom(o => o.location1.State))
                .ReverseMap();
            CreateMap<Resorts, ResortDto>()
                .ForMember(h => h.Location, otp => otp.MapFrom(o => o.Location.State))
                .ReverseMap();
<<<<<<< HEAD
=======
=======
            CreateMap<PaymentDtos, Payment>()
     .ForMember(dest => dest.Amount, opt => opt.MapFrom(src => src.Vnp_Amount))
     .ForMember(dest => dest.BankCode, opt => opt.MapFrom(src => src.Vnp_BankCode))
     .ForMember(dest => dest.Vnp_TransactionNo, opt => opt.MapFrom(src => src.Vnp_TransactionNo))
     .ForMember(dest => dest.OrderDescription, opt => opt.MapFrom(src => src.Vnp_OrderInfo))
     .ForMember(dest => dest.Status, opt => opt.MapFrom(src => int.Parse(src.Vnp_TransactionStatus)))
     .ForMember(dest => dest.CreatedDate, opt => opt.MapFrom(src => DateTime.ParseExact(src.Vnp_PayDate, "yyyyMMddHHmmss", CultureInfo.InvariantCulture)))
     .ForMember(dest => dest.Vpn_TxnResponseCode, opt => opt.MapFrom(src => src.Vnp_Response));




>>>>>>> 16175b6 (haidang)
>>>>>>> 64a5e53 (son create route for information page)
        }

    }
}
