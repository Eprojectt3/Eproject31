
using AutoMapper;
using backend.Dtos.CategoryDtos;
using backend.Dtos.HotelDtos;
using backend.Dtos.LocationDtos;
using backend.Dtos.PaymentDtos;
using backend.Dtos.TourDtos;
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
=======
            CreateMap<TourDto, Tour>().ReverseMap();
     .ForMember(dest => dest.Amount, opt => opt.MapFrom(src => src.Vnp_Amount))
            CreateMap<Tour_Detail_PaymentPaypal_Dto, TourDetail>().ReverseMap();
     .ForMember(dest => dest.Vnp_TransactionNo, opt => opt.MapFrom(src => src.Vnp_TransactionNo))
     .ForMember(dest => dest.OrderDescription, opt => opt.MapFrom(src => src.Vnp_OrderInfo))
     .ForMember(dest => dest.Status, opt => opt.MapFrom(src => int.Parse(src.Vnp_TransactionStatus)))
     .ForMember(dest => dest.CreatedDate, opt => opt.MapFrom(src => DateTime.ParseExact(src.Vnp_PayDate, "yyyyMMddHHmmss", CultureInfo.InvariantCulture)))
     .ForMember(dest => dest.Vpn_TxnResponseCode, opt => opt.MapFrom(src => src.Vnp_Response));


=======
            CreateMap<PaymentDtos, Payment>()
     .ForMember(dest => dest.Amount, opt => opt.MapFrom(src => src.Vnp_Amount))
     .ForMember(dest => dest.BankCode, opt => opt.MapFrom(src => src.Vnp_BankCode))
     .ForMember(dest => dest.Vnp_TransactionNo, opt => opt.MapFrom(src => src.Vnp_TransactionNo))
     .ForMember(dest => dest.OrderDescription, opt => opt.MapFrom(src => src.Vnp_OrderInfo))
     .ForMember(dest => dest.Status, opt => opt.MapFrom(src => int.Parse(src.Vnp_TransactionStatus)))
     .ForMember(dest => dest.CreatedDate, opt => opt.MapFrom(src => DateTime.ParseExact(src.Vnp_PayDate, "yyyyMMddHHmmss", CultureInfo.InvariantCulture)))
     .ForMember(dest => dest.Vpn_TxnResponseCode, opt => opt.MapFrom(src => src.Vnp_Response));


=======
            CreateMap<PaymentDtos, Payment>()
     .ForMember(dest => dest.Amount, opt => opt.MapFrom(src => src.Vnp_Amount))
            CreateMap<Tour_Detail_PaymentPaypal_Dto, TourDetail>().ReverseMap();
     .ForMember(dest => dest.OrderDescription, opt => opt.MapFrom(src => src.Vnp_OrderInfo))
     .ForMember(dest => dest.Status, opt => opt.MapFrom(src => int.Parse(src.Vnp_TransactionStatus)))
     .ForMember(dest => dest.CreatedDate, opt => opt.MapFrom(src => DateTime.ParseExact(src.Vnp_PayDate, "yyyyMMddHHmmss", CultureInfo.InvariantCulture)))
     .ForMember(dest => dest.Vpn_TxnResponseCode, opt => opt.MapFrom(src => src.Vnp_Response));


=======
            CreateMap<PaymentDtos, Payment>()
     .ForMember(dest => dest.Amount, opt => opt.MapFrom(src => src.Vnp_Amount))
     .ForMember(dest => dest.BankCode, opt => opt.MapFrom(src => src.Vnp_BankCode))
     .ForMember(dest => dest.Vnp_TransactionNo, opt => opt.MapFrom(src => src.Vnp_TransactionNo))
     .ForMember(dest => dest.OrderDescription, opt => opt.MapFrom(src => src.Vnp_OrderInfo))
     .ForMember(dest => dest.Status, opt => opt.MapFrom(src => int.Parse(src.Vnp_TransactionStatus)))
     .ForMember(dest => dest.CreatedDate, opt => opt.MapFrom(src => DateTime.ParseExact(src.Vnp_PayDate, "yyyyMMddHHmmss", CultureInfo.InvariantCulture)))
     .ForMember(dest => dest.Vpn_TxnResponseCode, opt => opt.MapFrom(src => src.Vnp_Response));



            CreateMap<TourDto, Tour>().ReverseMap();

>>>>>>> 16175b6 (haidang)
>>>>>>> 64a5e53 (son create route for information page)
        }
    }
}
