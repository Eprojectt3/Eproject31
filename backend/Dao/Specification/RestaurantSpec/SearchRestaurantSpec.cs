﻿using backend.Entity;
using webapi.Dao.Specification;

namespace backend.Dao.Specification.RestaurantSpec
{
    public class SearchRestaurantSpec : BaseSpecification<Restaurant>
    {
        public SearchRestaurantSpec(SpecParams param)
            : base(l =>
            (string.IsNullOrEmpty(param.Search) ||
            l.Name.ToLower().Contains(param.Search)) &&
                (param.Location == null || l.Location.State.ToLower().Contains(param.Location)) &&
                (param.Rating == null || l.Rating == param.Rating)
        )
        {
            Includes.Add(s => s.Location);
        }
    }
}
