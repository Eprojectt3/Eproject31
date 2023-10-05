﻿namespace backend.Dao.Specification
{
    public class SpecParams
    {
        private const int MaxPageSize = 10;
        public int PageIndex { get; set; } = 1;

        private int pageSize = 5;

        public int PageSize
        {
            get { return pageSize; }
            set { pageSize = value > MaxPageSize ? MaxPageSize : value; }
        }

        private string? search;

        public string? Location { get; set; }

        public int? Rating { get; set; }
        public bool? IsActive { get; set; }
        public string? Search
        {
            get { return search; }
            set
            {
                search = value.ToLower();
            }
        }
    }
}
