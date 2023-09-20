using backend.Base;
using backend.BussinessLogic;
using backend.Helper;
using Microsoft.AspNetCore.Mvc;
using System.Collections;
using webapi.Dao.Repository;
using webapi.Dao.UnitofWork;
using webapi.Data;

namespace backend.Extensions
{
    public static class ApplicationServicesExtension
    {
        public static IServiceCollection AddAppServices(this IServiceCollection services)
        {
            services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));

            services.AddScoped<IUnitofWork, UnitofWork>();
            services.AddSingleton<Hashtable>();
            services.AddTransient<CategoryBusinessLogic>();
            services.AddTransient<RestaurantBusinessLogic>();
            services.AddTransient<HotelBusinessLogic>();
            services.AddTransient<LocationBusinessLogic>();
            services.AddTransient<DiscountBusinessLogic>();
            services.AddTransient<TransportationBusinessLogic>();
            services.AddTransient<ResortBusinessLogic>();
            services.AddTransient<PaymentBussinessLogic>();

            services.AddAutoMapper(typeof(AutoMapper1));
            services.Configure<ApiBehaviorOptions>(options =>
            {
                options.InvalidModelStateResponseFactory = acttionContext =>
                {
                    var errors = acttionContext.ModelState
                        .Where(e => e.Value.Errors.Count > 0)
                        .SelectMany(x => x.Value.Errors)
                        .Select(x => x.ErrorMessage)
                        .ToArray();
                    var errorResponse = new APIValidationError
                    {
                        Errors = errors,
                        Message = "Validation failed"
                    };
                    return new BadRequestObjectResult(errorResponse);
                };
            });

            return services;
        }
    }
}
