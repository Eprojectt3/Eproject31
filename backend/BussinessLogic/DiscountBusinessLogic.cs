using AutoMapper;
using backend.Dao.Specification;
using backend.Dao.Specification.DiscountSpec;
using backend.Dtos.DiscountDtos;
using backend.Entity;
using backend.Exceptions;
using backend.Helper;
using webapi.Dao.UnitofWork;

namespace backend.BussinessLogic
{
    public class DiscountBusinessLogic
    {
        public IUnitofWork unitofWork;
        public IMapper mapper;
        public DiscountBusinessLogic(IUnitofWork _unitofWork, IMapper mapper)
        {
            unitofWork = _unitofWork;
            this.mapper = mapper;
        }

        //list category
        public async Task<IReadOnlyList<Discount>> SelectAllDiscount()
        {
            var data = await unitofWork.Repository<Discount>().GetAllAsync();
            return data;
        }

        //create category
        public async Task Create(Discount discount)
        {
            if (discount is null)
            {
                throw new NotFoundExceptions("Cattegory not found");
            }

            if (await IsDiscountDuplicate(discount.Discount1))
            {
                throw new BadRequestExceptions("Discount is exist.");
            }


            await unitofWork.Repository<Discount>().AddAsync(discount);
            var check = await unitofWork.Complete();
            if (check < 1)
            {
                throw new BadRequestExceptions("chua dc thuc thi");
            }
        }

        //update discount
        public async Task Update(Discount discount)
        {
            if (discount is null)
            {
                throw new NotFoundExceptions("not found");
            }

            var existingDiscount = await unitofWork.Repository<Discount>().GetByIdAsync(discount.Id);

            if (existingDiscount is null)
            {
                throw new NotFoundExceptions("not found");
            }
            existingDiscount.UpdateDate = discount.UpdateDate;
            existingDiscount.CreateDate = discount.CreateDate;
            existingDiscount.UpdateBy = discount.UpdateBy;
            existingDiscount.CreateBy = discount.CreateBy;
            existingDiscount.IsActive = discount.IsActive;
            existingDiscount.Discount1 = discount.Discount1;
            existingDiscount.Start_Date = discount.Start_Date;
            existingDiscount.End_Date = discount.End_Date;
            existingDiscount.Description = discount.Description;

            if (await IsDiscountDuplicate(discount.Discount1))
            {
                throw new BadRequestExceptions("Discount is exist.");
            }

            await unitofWork.Repository<Discount>().Update(existingDiscount);
            var check = await unitofWork.Complete();
            if (check < 1)
            {
                throw new BadRequestExceptions("chua dc thuc thi");
            }
        }

        //delete discount
        public async Task Delete(int id)
        {

            var existingDiscount = await unitofWork.Repository<Discount>().GetByIdAsync(id);
            if (existingDiscount == null)
            {
                throw new NotFoundExceptions("not found");
            }
            await unitofWork.Repository<Discount>().Delete(existingDiscount);
            var check = await unitofWork.Complete();
            if (check < 1)
            {
                throw new BadRequestExceptions("chua dc thuc thi");
            }
        }
        //duplicate name
        private async Task<bool> IsDiscountDuplicate(string DiscountName)
        {
            // Chuyển tên discount thành chữ thường để so sánh không phân biệt chữ hoa/chữ thường
            DiscountName = DiscountName.ToLower();

            // Sử dụng GetEntityWithSpecAsync để kiểm tra trùng lặp
            var duplicateDiscount = await unitofWork.Repository<Discount>()
                .GetEntityWithSpecAsync(new DiscountByNameSpecification(DiscountName));

            return duplicateDiscount != null;
        }
        public async Task<Pagination<DiscountDto>> SelectAllDiscountPagination(SpecParams specParams)
        {

            var spec = new SearchDiscountSpec(specParams);
            var discounts = await unitofWork.Repository<Discount>().GetAllWithAsync(spec);

            var data = mapper.Map<IReadOnlyList<Discount>, IReadOnlyList<DiscountDto>>(discounts);
            var DiscountPage = data.Skip((specParams.PageIndex - 1) * specParams.PageSize).Take(specParams.PageSize).ToList();

            var countSpec = new SearchDiscountSpec(specParams);
            var count = await unitofWork.Repository<Discount>().GetCountWithSpecAsync(countSpec);

            var totalPageIndex = count % specParams.PageSize == 0 ? count / specParams.PageSize : (count / specParams.PageSize) + 1;

            var pagination = new Pagination<DiscountDto>(specParams.PageIndex, specParams.PageSize, DiscountPage, count, totalPageIndex);

            return pagination;
        }
    }
}
