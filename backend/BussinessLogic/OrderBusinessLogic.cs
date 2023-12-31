﻿using backend.Entity;
using backend.Exceptions;
using webapi.Dao.UnitofWork;

namespace backend.BussinessLogic
{
    public class OrderBusinessLogic
    {
        public IUnitofWork unitofWork;

        public OrderBusinessLogic(IUnitofWork _unitofWork)
        {
            unitofWork = _unitofWork;
        }

        //list order
        public async Task<IReadOnlyList<Order>> SelectAllOrder()
        {
            var data = await unitofWork.Repository<Order>().GetAllAsync();
            return data;
        }

        //create order
        public async Task Create(Order order)
        {
            if (order is null)
            {
                throw new NotFoundExceptions("Cattegory not found");
            }
            await unitofWork.Repository<Order>().AddAsync(order);
            var check = await unitofWork.Complete();
            if (check < 1)
            {
                throw new BadRequestExceptions("chua dc thuc thi");
            }
        }

        //update order
        public async Task Update(Order order)
        {
            if (order is null)
            {
                throw new NotFoundExceptions("not found");
            }

            var existingOrder = await unitofWork.Repository<Order>().GetByIdAsync(order.Id);

            if (existingOrder is null)
            {
                throw new NotFoundExceptions("not found");
            }
            existingOrder.UpdateDate = order.UpdateDate;
            existingOrder.CreateDate = order.CreateDate;
            existingOrder.UpdateBy = order.UpdateBy;
            existingOrder.CreateBy = order.CreateBy;
            existingOrder.Price = order.Price;
            existingOrder.IsActive = order.IsActive;
            existingOrder.Number_people = order.Number_people;
            existingOrder.Create_Date = order.Create_Date;
            existingOrder.End_Date = order.End_Date;
            await unitofWork.Repository<Order>().Update(existingOrder);
            var check = await unitofWork.Complete();
            if (check < 1)
            {
                throw new BadRequestExceptions("chua dc thuc thi");
            }
        }

        //delete order
        public async Task Delete(int id)
        {

            var existingOrder = await unitofWork.Repository<Order>().GetByIdAsync(id);
            if (existingOrder == null)
            {
                throw new NotFoundExceptions("not found");
            }
            await unitofWork.Repository<Order>().Delete(existingOrder);
            var check = await unitofWork.Complete();
            if (check < 1)
            {
                throw new BadRequestExceptions("chua dc thuc thi");
            }
        }
    }
}
