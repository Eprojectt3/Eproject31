﻿using backend.Entity;
using webapi.Dao.Specification;

namespace backend.Dao.Specification.ResortSpec
{
    public class SearchResortSpec : BaseSpecification<Resorts>
    {
        public SearchResortSpec(SpecParams param)
            : base(l =>
            (string.IsNullOrEmpty(param.Search) ||
            param.Search.ToLower().Contains(l.Name.ToLower())) &&
                (param.Location == null || l.Location.State == param.Location) &&
                (param.Rating == null || l.Rating == param.Rating)
        )
        {
            Includes.Add(s => s.Location);
        }
    }
}
