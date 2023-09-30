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
            var httpRequest = _httpContextAccessor.HttpContext.Request;

            var query = from order in context.Order
                        join tour in context.Tour on order.Tour_ID equals tour.Id
                        select new Top_10_Output
                        {
                            Number_People = order.Number_people,
                            Tour_ID = order.Tour_ID,
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
            var list_order = await query.ToListAsync();

            for (int i = 0; i < list_order.Count; i++)
            {
                for (int j = i + 1; j < list_order.Count; j++)
                {
                    if (list_order[i].Tour_ID == list_order[j].Tour_ID)
                    {
                        list_order[i].Number_People += list_order[j].Number_People;
                        list_order.RemoveAt(j); 
                        j--; 
                    }
                }
            }
            var result = list_order.OrderByDescending(p => p.Number_People).Take(10).ToList();
            return result;
        }
    }
    public class Top_10_Output : Search_Tour_Dto_Output
    {
        public int? Number_People { get; set; }
        public int? Tour_ID { get; set; }
    }
}
