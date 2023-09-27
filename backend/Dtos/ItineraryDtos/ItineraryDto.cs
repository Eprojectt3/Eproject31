﻿using backend.Entity;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Dtos.ItineraryDtos
{
    public class ItineraryDto
    {
        public string? Tour_Name { get; set; }
        public int? Sequence { get; set; }
        public string? Description { get; set; }
        public string? Type { get; set; }
    }
}