﻿namespace backend.Dtos.StaffDtos
{
    public class StaffImageDto
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public int? Phone { get; set; }
        public string? Email { get; set; }
        public string? PersonId { get; set; }
        public IFormFileCollection fileCollection { get; set; }
    }
}