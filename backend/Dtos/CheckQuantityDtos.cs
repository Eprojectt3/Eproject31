using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace backend.Dtos
{

    public class CheckQuantityDtos 
    {
        public DateTime Start_Date { get; set; }
        public int TourID { get; set; }
        public int number_people { get; set; }
    }
}
