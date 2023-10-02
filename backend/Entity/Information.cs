﻿using webapi.Base;

namespace backend.Entity
{
    public class Information : BaseCreateDate
    {
        public int Id { get; set; }
        public string Location { get; set; }
        public string Transportation { get; set; }
        public string Departure_Date { get; set; }
        public string End_Date { get; set; }
        public string Destination {  get; set; }
        public string Description { get; set; }
    }
}
