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
        public async Task<List<Top_10_Output>> Top_10_Tour()
        {
            var query = from order in context.Order
                        join tour in context.Tour on order.Tour_ID equals tour.Id
                        group order by order.Tour_ID into grouped
                        select new Top_10_Output
                        {
                            Tour_ID = grouped.Key,
                            Number_People = grouped.Sum(o => o.Number_people)
                        };

            var top10TourIds = await query.OrderByDescending(g => g.Number_People)
                                           .Take(10)
                                           .Select(g => g.Tour_ID)
                                           .ToListAsync();

            var httpRequest = _httpContextAccessor.HttpContext.Request;

            var result = await(from order in context.Order
                        join tour in context.Tour on order.Tour_ID equals tour.Id
                         where top10TourIds.Contains(tour.Id)
                               select new Top_10_Output
                                {       
                                    Id = order.Id,
                                    Number_People = order.Number_people,
                                    Tour_ID = tour.Id,
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
                                })
                                .ToListAsync();

            return result;
        }
    }
    public class Top_10_Output : Search_Tour_Dto_Output
    {
        public int? Number_People { get; set; }
        public int? Tour_ID { get; set; }
    }
}
