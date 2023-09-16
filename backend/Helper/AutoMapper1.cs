using AutoMapper;
using backend.Dtos.CategoryDtos;
using backend.Entity;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace backend.Helper
{
    public class AutoMapper1 : Profile
    {
        public AutoMapper1()
        {
            CreateMap<CategoryDtos, Category>().ReverseMap();

        }

    }
}
