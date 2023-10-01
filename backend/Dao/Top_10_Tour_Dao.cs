using backend.Dtos.TourDtos;
using backend.Helper;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using webapi.Data;

namespace backend.Dao
{
    public class Top_10_Tour_Dao
    {
        private DataContext context;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private ImageService Image;

        public Top_10_Tour_Dao(DataContext dataContext, IHttpContextAccessor httpContextAccessor, ImageService imageService)
        {
            this.context = dataContext;
            this._httpContextAccessor = httpContextAccessor;
            this.Image = imageService;
        }
        public async Task<List<Search_Tour_Dto_Output>> Top_10_Tour()
        {
            var httpRequest = _httpContextAccessor.HttpContext.Request;

            var query = from order in context.Order
                        join tour_detail in context.TourDetail on order.Tour_Detail_ID equals tour_detail.Id
                        join tour in context.Tour on tour_detail.TourId equals tour.Id
                        orderby order.Number_people descending
                        select new Search_Tour_Dto_Output
                        {
                            Id = tour.Id,
                            Name = tour.Name,
                            Price = tour.Price,
                            category_id = tour.category_id,
                            Description = tour.Description,
                            image = tour.image,
                            quantity_limit = tour.quantity_limit,
                            Rating = tour.Rating,
                            Type = tour.Type,
                            Range_time = tour.Range_time,
                            Discount = tour.Discount,
                            Transportation_ID = tour.Transportation_ID,
                            UrlImage = Image.GetUrlImage(tour.Name, "tour", httpRequest)
                        };
            var result = await query.ToListAsync();
            return result;
        }
    }
}
