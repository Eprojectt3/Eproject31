using backend.Entity;
using backend.Exceptions;
using webapi.Dao.UnitofWork;

namespace backend.BussinessLogic
{
    public class StaffBusinessLogic
    {
        public IUnitofWork unitofWork;

        public StaffBusinessLogic(IUnitofWork _unitofWork)
        {
            unitofWork = _unitofWork;
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
    }
}
