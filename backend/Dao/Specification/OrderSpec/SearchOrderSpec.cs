﻿using backend.Entity;
using webapi.Dao.Specification;

namespace backend.Dao.Specification.OrderSpec
{
    public class SearchOrderSpec : BaseSpecification<Order>
    {
        public SearchOrderSpec(SpecParams param)
          : base(l =>
          string.IsNullOrEmpty(param.Search) ||
          param.Search == (l.Price).ToString()
      )
        {
            
        }
       
    }
}