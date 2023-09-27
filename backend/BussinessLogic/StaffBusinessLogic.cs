using AutoMapper;
using backend.Dao.Specification.StaffSpec;
using backend.Dao.Specification;
using backend.Dtos.StaffDtos;
using backend.Entity;
using backend.Exceptions;
using backend.Helper;
using webapi.Dao.UnitofWork;

namespace backend.BussinessLogic
{
    public class StaffBusinessLogic
    {
        public IUnitofWork unitofWork;
        public IMapper mapper;
        public StaffBusinessLogic(IUnitofWork _unitofWork, IMapper mapper)
        {
            unitofWork = _unitofWork;
            this.mapper = mapper;
        }

        //list staff
        public async Task<IReadOnlyList<Staff>> SelectAllStaff()
        {
            var data = await unitofWork.Repository<Staff>().GetAllAsync();
            return data;
        }

        //create staff
        public async Task Create(Staff staff)
        {
            if (staff is null)
            {
                throw new NotFoundExceptions("Cattegory not found");
            }
            await unitofWork.Repository<Staff>().AddAsync(staff);
            var check = await unitofWork.Complete();
            if (check < 1)
            {
                throw new BadRequestExceptions("chua dc thuc thi");
            }
        }

        //update staff
        public async Task Update(Staff staff)
        {
            if (staff is null)
            {
                throw new NotFoundExceptions("not found");
            }

            var existingStaff = await unitofWork.Repository<Staff>().GetByIdAsync(staff.Id);

            if (existingStaff is null)
            {
                throw new NotFoundExceptions("not found");
            }
            existingStaff.UpdateDate = staff.UpdateDate;
            existingStaff.CreateDate = staff.CreateDate;
            existingStaff.UpdateBy = staff.UpdateBy;
            existingStaff.CreateBy = staff.CreateBy;
            existingStaff.IsActive = staff.IsActive;
            existingStaff.Name = staff.Name;
            existingStaff.Image = staff.Image;
            existingStaff.Phone = staff.Phone;
            existingStaff.Email = staff.Email;
            existingStaff.PersonId = staff.PersonId;

            await unitofWork.Repository<Staff>().Update(existingStaff);
            var check = await unitofWork.Complete();
            if (check < 1)
            {
                throw new BadRequestExceptions("chua dc thuc thi");
            }
        }

        //delete staff
        public async Task Delete(int id)
        {

            var existingStaff = await unitofWork.Repository<Staff>().GetByIdAsync(id);
            if (existingStaff == null)
            {
                throw new NotFoundExceptions("not found");
            }
            await unitofWork.Repository<Staff>().Delete(existingStaff);
            var check = await unitofWork.Complete();
            if (check < 1)
            {
                throw new BadRequestExceptions("chua dc thuc thi");
            }
        }
        public async Task<Pagination<StaffDto>> SelectAllStaffPagination(SpecParams specParams)
        {

            var spec = new SearchStaffSpec(specParams);
            var resorts = await unitofWork.Repository<Staff>().GetAllWithAsync(spec);

            var data = mapper.Map<IReadOnlyList<Staff>, IReadOnlyList<StaffDto>>(resorts);
            var staffPage = data.Skip((specParams.PageIndex - 1) * specParams.PageSize).Take(specParams.PageSize).ToList();

            var countSpec = new SearchStaffSpec(specParams);
            var count = await unitofWork.Repository<Staff>().GetCountWithSpecAsync(countSpec);

            var totalPageIndex = count % specParams.PageSize == 0 ? count / specParams.PageSize : (count / specParams.PageSize) + 1;

            var pagination = new Pagination<StaffDto>(specParams.PageIndex, specParams.PageSize, staffPage, count, totalPageIndex);

            return pagination;
        }
    }
}
