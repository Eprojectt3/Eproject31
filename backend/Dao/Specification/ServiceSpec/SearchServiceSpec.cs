﻿using backend.Entity;
using webapi.Dao.Specification;

namespace backend.Dao.Specification.ServiceSpec
{
    public class SearchServiceSpec : BaseSpecification<Service>
    {
        public SearchServiceSpec(SpecParams param)
            : base(l =>
            string.IsNullOrEmpty(param.Search) ||
            l.Name.ToLower().Contains(param.Search.ToLower()) && (l.IsActive == true)

        )
        {
            Includes.Add(s => s.Tour);
        }
    }
}
