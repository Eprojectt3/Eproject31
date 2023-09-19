using backend.Dao.Specification.ResortSpec;
using backend.Entity;
using backend.Exceptions;
using webapi.Dao.UnitofWork;

namespace backend.BussinessLogic
{
  public class ResortBusinessLogic
  {
    public IUnitofWork unitofWork;

    public ResortBusinessLogic(IUnitofWork _unitofWork)
    {
      unitofWork = _unitofWork;
    }

    //list category
    public async Task<IReadOnlyList<Resorts>> SelectAllResorts()
    {
      var data = await unitofWork.Repository<Resorts>().GetAllAsync();

      return data;
    }

    //create category
    public async Task Create(Resorts resort)
    {
      if (resort is null)
      {
        throw new NotFoundExceptions("Cattegory not found");
      }

      if (await IsResortsAddressDuplicate(resort.Address))
      {
        throw new BadRequestExceptions("Resorts Address is exist.");
      }

      await unitofWork.Repository<Resorts>().AddAsync(resort);
      var check = await unitofWork.Complete();
      if (check < 1)
      {
        throw new BadRequestExceptions("chua dc thuc thi");
      }
    }

    //update resort
    public async Task Update(Resorts resort)
    {
      if (resort is null)
      {
        throw new NotFoundExceptions("not found");
      }

      var existingResorts = await unitofWork.Repository<Resorts>().GetByIdAsync(resort.Id);

      if (existingResorts is null)
      {
        throw new NotFoundExceptions("not found");
      }
      existingResorts.UpdateDate = resort.UpdateDate;
      existingResorts.CreateDate = resort.CreateDate;
      existingResorts.UpdateBy = resort.UpdateBy;
      existingResorts.CreateBy = resort.CreateBy;
      existingResorts.Name = resort.Name;
      existingResorts.Address = resort.Address;
      existingResorts.Rating = resort.Rating;
      existingResorts.ImageDetail = resort.ImageDetail;
      existingResorts.Description = resort.Description;
      existingResorts.Image = resort.Image;
      existingResorts.Price = resort.Price;
      existingResorts.Price_range = resort.Price_range;
      existingResorts.PhoneNumber = resort.PhoneNumber;
      existingResorts.IsActive = resort.IsActive;
      existingResorts.LocationId = resort.LocationId;
      existingResorts.Links = resort.Links;
      if (await IsResortsAddressDuplicate(resort.Address))
      {
        throw new BadRequestExceptions("Resorts Address is exist.");
      }

      await unitofWork.Repository<Resorts>().Update(existingResorts);
      var check = await unitofWork.Complete();
      if (check < 1)
      {
        throw new BadRequestExceptions("chua dc thuc thi");
      }
    }

    //delete resort
    public async Task Delete(int id)
    {
      var existingResorts = await unitofWork.Repository<Resorts>().GetByIdAsync(id);
      if (existingResorts == null)
      {
        throw new NotFoundExceptions("not found");
      }
      await unitofWork.Repository<Resorts>().Delete(existingResorts);
      var check = await unitofWork.Complete();
      if (check < 1)
      {
        throw new BadRequestExceptions("chua dc thuc thi");
      }
    }

    //get resort by id
    public async Task GetByResortId(int id)
    {
      var existingHotel = await unitofWork.Repository<Resorts>().GetByIdAsync(id);
      if (existingHotel == null)
      {
        throw new NotFoundExceptions("not found");
      }
    }

    //duplicate name
    private async Task<bool> IsResortsAddressDuplicate(string resortAddress)
    {
      // Sử dụng GetEntityWithSpecAsync để kiểm tra trùng lặp
      var duplicateResorts = await unitofWork
          .Repository<Resorts>()
          .GetEntityWithSpecAsync(new ResortByAddressSpecification(resortAddress));

      return duplicateResorts != null;
    }
  }
}
