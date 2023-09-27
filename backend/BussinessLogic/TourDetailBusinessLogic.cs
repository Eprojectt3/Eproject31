using AutoMapper;
using backend.Dao.Specification;
using backend.Dtos.TourDtos;
using backend.Entity;
using backend.Exceptions;
using backend.Helper;
using webapi.Dao.UnitofWork;
using backend.Dtos.TourDetailDtos;
using backend.Dao.Specification.TourDetailSpec;

namespace backend.BussinessLogic
{
    public class TourDetailBusinessLogic
    {
        public IUnitofWork unitofWork;
        public IMapper mapper;
        public TourDetailBusinessLogic(IUnitofWork _unitofWork, IMapper mapper)
        {
            unitofWork = _unitofWork;
            this.mapper = mapper;
        }

        //list tourDetail
        public async Task<IReadOnlyList<TourDetail>> SelectAllTourDetail()
        {
            var data = await unitofWork.Repository<TourDetail>().GetAllAsync();
            return data;
        }

        //create tourDetail
        public async Task Create(TourDetail tourDetail)
        {
            if (tourDetail is null)
            {
                throw new NotFoundExceptions("Cattegory not found");
            }
            await unitofWork.Repository<TourDetail>().AddAsync(tourDetail);
            var check = await unitofWork.Complete();
            if (check < 1)
            {
                throw new BadRequestExceptions("chua dc thuc thi");
            }
        }

        //update tourDetail
        public async Task Update(TourDetail tourDetail)
        {
            if (tourDetail is null)
            {
                throw new NotFoundExceptions("not found");
            }

            var existingTourDetail = await GetTourDetailAsync(tourDetail.Id);

            if (existingTourDetail is null)
            {
                throw new NotFoundExceptions("not found");
            }
            existingTourDetail.UpdateDate = tourDetail.UpdateDate;
            existingTourDetail.CreateDate = tourDetail.CreateDate;
            existingTourDetail.UpdateBy = tourDetail.UpdateBy;
            existingTourDetail.CreateBy = tourDetail.CreateBy;
            existingTourDetail.IsActive = tourDetail.IsActive;
            existingTourDetail.TourId = tourDetail.TourId;
            existingTourDetail.Start_Date = tourDetail.Start_Date;
            existingTourDetail.End_Date = tourDetail.End_Date;
            existingTourDetail.Range_time = tourDetail.Range_time;
            existingTourDetail.Quantity = tourDetail.Quantity;
            existingTourDetail.Staff_Id = tourDetail.Staff_Id;
            existingTourDetail.Description = tourDetail.Description;
            await unitofWork.Repository<TourDetail>().Update(existingTourDetail);
            var check = await unitofWork.Complete();
            if (check < 1)
            {
                throw new BadRequestExceptions("chua dc thuc thi");
            }
        }

        //delete tourDetail
        public async Task Delete(int id)
        {

            var existingTourDetail = await unitofWork.Repository<TourDetail>().GetByIdAsync(id);
            if (existingTourDetail == null)
            {
                throw new NotFoundExceptions("not found");
            }
            await unitofWork.Repository<TourDetail>().Delete(existingTourDetail);
            var check = await unitofWork.Complete();
            if (check < 1)
            {
                throw new BadRequestExceptions("chua dc thuc thi");
            }
        }
        public async Task<TourDetail?> GetTourDetailAsync(int id)
        {
            var check = await unitofWork.Repository<TourDetail>().GetByIdAsync(id);
            if(check == null)
            {
                return null;
            }
            return check;
        }
        public async Task<Pagination<TourDetailDto>> SelectAllTourDetailPagination(SpecParams specParams)
        {

            var spec = new SearchTourDetailSpec(specParams);
            var tourDetails = await unitofWork.Repository<TourDetail>().GetAllWithAsync(spec);

            var data = mapper.Map<IReadOnlyList<TourDetail>, IReadOnlyList<TourDetailDto>>(tourDetails);
            var tourDetailsPage = data.Skip((specParams.PageIndex - 1) * specParams.PageSize).Take(specParams.PageSize).ToList();

            var countSpec = new SearchTourDetailSpec(specParams);
            var count = await unitofWork.Repository<TourDetail>().GetCountWithSpecAsync(countSpec);

            var totalPageIndex = count % specParams.PageSize == 0 ? count / specParams.PageSize : (count / specParams.PageSize) + 1;

            var pagination = new Pagination<TourDetailDto>(specParams.PageIndex, specParams.PageSize, tourDetailsPage, count, totalPageIndex);

            return pagination;
        }
    }
}
