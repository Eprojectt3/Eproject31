﻿using backend.Dao.Specification.Order1;
using backend.Dao.Specification.OrderDetail1;
using backend.Entity;
using backend.Exceptions;
using webapi.Dao.UnitofWork;

namespace backend.BussinessLogic
{
    public class OrderDetailBusinessLogic
    {
        public IUnitofWork unitofWork;

        public OrderDetailBusinessLogic(IUnitofWork _unitofWork)
        {
            unitofWork = _unitofWork;
        }

        //list orderDetail
        public async Task<IReadOnlyList<OrderDetail>> SelectAllOrderDetail()
        {
            var data = await unitofWork.Repository<OrderDetail>().GetAllAsync();
            return data;
        }
        public async Task<IEnumerable<OrderDetail>> SelectAllOrderDetail2(int id)
        {
            var spec = new OrderDetailSpec(id);
            var data = await unitofWork.Repository<OrderDetail>().GetAllWithAsync(spec);
            return data;
        }

        //create orderDetail
        public async Task Create(OrderDetail orderDetail)
        {
            if (orderDetail is null)
            {
                throw new NotFoundExceptions("Cattegory not found");
            }
            await unitofWork.Repository<OrderDetail>().AddAsync(orderDetail);
            var check = await unitofWork.Complete();
            if (check < 1)
            {
                throw new BadRequestExceptions("chua dc thuc thi");
            }
        }

        //update orderDetail
        public async Task Update(OrderDetail orderDetail)
        {
            if (orderDetail is null)
            {
                throw new NotFoundExceptions("not found");
            }

            var existingOrderDetail = await unitofWork.Repository<OrderDetail>().GetByIdAsync(orderDetail.Id);

            if (existingOrderDetail is null)
            {
                throw new NotFoundExceptions("not found");
            }
            existingOrderDetail.UpdateDate = orderDetail.UpdateDate;
            existingOrderDetail.CreateDate = orderDetail.CreateDate;
            existingOrderDetail.UpdateBy = orderDetail.UpdateBy;
            existingOrderDetail.CreateBy = orderDetail.CreateBy;
            existingOrderDetail.IsActive = orderDetail.IsActive;            
            existingOrderDetail.OrderID = orderDetail.OrderID;
            existingOrderDetail.Quantity = orderDetail.Quantity;
            existingOrderDetail.Price = orderDetail.Price;
            existingOrderDetail.Rating = orderDetail.Rating;          
            existingOrderDetail.UserID = orderDetail.UserID;
            existingOrderDetail.Payment_ID = orderDetail.Payment_ID;
            existingOrderDetail.Type_Payment = orderDetail.Type_Payment;

            
            await unitofWork.Repository<OrderDetail>().Update(existingOrderDetail);
            var check = await unitofWork.Complete();
            if (check < 1)
            {
                throw new BadRequestExceptions("chua dc thuc thi");
            }
        }

        //delete orderDetail
        public async Task Delete(int id)
        {

            var existingOrderDetail = await unitofWork.Repository<OrderDetail>().GetByIdAsync(id);
            if (existingOrderDetail == null)
            {
                throw new NotFoundExceptions("not found");
            }
            await unitofWork.Repository<OrderDetail>().Delete(existingOrderDetail);
            var check = await unitofWork.Complete();
            if (check < 1)
            {
                throw new BadRequestExceptions("chua dc thuc thi");
            }
        }
        public async Task<OrderDetail> GetOrderDetailById(int Id)
        {
            var result = await unitofWork.Repository<OrderDetail>().GetByIdAsync(Id);
            if(result == null)
            {
                return null;
            }
            return result;
        }
      
    }
}
