using backend.Entity;
using backend.Exceptions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using webapi.Dao.UnitofWork;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlaceTypeController : ControllerBase
    {
        private IUnitofWork unitofWork;
        public PlaceTypeController(IUnitofWork unitofWork)
        {
            this.unitofWork = unitofWork;
        }
        [HttpGet]
        public async Task<IActionResult> List()
        {
            var list = await unitofWork.Repository<PlaceType>().GetAllAsync();
            return Ok(list);
        }
        [HttpPost]
        [Authorize(Roles = "Admin")]

        public async Task<IActionResult> Add(PlaceType placeType)
        {
              await unitofWork.Repository<PlaceType>().AddAsync(placeType);
            var check = await unitofWork.Complete();
            if(check > 0)
            {
                return Ok(placeType);
            }
            return Ok(new {
                message = "Khong thanh cong",
        });
        }
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]

        public async Task<IActionResult> Update(PlaceType placeType,int id)
        {
            var check = await unitofWork.Repository<PlaceType>().GetByIdAsync(id);
            if(check!= null)
            {
                check.Name = placeType.Name;
                await unitofWork.Repository<PlaceType>().Update(check);
                var result = await unitofWork.Complete();
                if(result > 0)
                {
                    return Ok(placeType);
                }
            }     
            return Ok(new
            {
                message = "Khong thanh cong",
            });
        }
    }
}
