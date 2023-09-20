using AutoMapper;
using backend.Dtos.CategoryDtos;
using backend.Dtos.PaymentDtos;
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
            CreateMap<PaymentDtos, Payment>()
     .ForMember(dest => dest.Amount, opt => opt.MapFrom(src => src.Vnp_Amount))
     .ForMember(dest => dest.BankCode, opt => opt.MapFrom(src => src.Vnp_BankCode))
     .ForMember(dest => dest.Vnp_TransactionNo, opt => opt.MapFrom(src => src.Vnp_TransactionNo))
     .ForMember(dest => dest.OrderDescription, opt => opt.MapFrom(src => src.Vnp_OrderInfo))
     .ForMember(dest => dest.Status, opt => opt.MapFrom(src => int.Parse(src.Vnp_TransactionStatus)))
     .ForMember(dest => dest.CreatedDate, opt => opt.MapFrom(src => DateTime.ParseExact(src.Vnp_PayDate, "yyyyMMddHHmmss", CultureInfo.InvariantCulture)))
     .ForMember(dest => dest.Vpn_TxnResponseCode, opt => opt.MapFrom(src => src.Vnp_Response));




        }

    }
}
