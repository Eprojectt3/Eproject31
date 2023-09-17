using backend.Entity;
using webapi.Dao.Specification;

namespace backend.Dao.Specification.ResortSpec
{
    public class ResortByAddressSpecification : BaseSpecification<Resorts>
    {
        public ResortByAddressSpecification(string resortAddress)
        : base(resort => resort.Address.ToLower() == resortAddress.ToLower())
        {
        }
    }
}
