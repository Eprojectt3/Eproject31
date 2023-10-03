﻿using AutoMapper;
using backend.Dao.Specification;
using backend.Dao.Specification.OrderSpec;
using backend.Dao.Specification.Order1;
using backend.Dtos.OrderDtos;
using backend.Entity;
using backend.Exceptions;
using backend.Helper;
using webapi.Dao.UnitofWork;
using webapi.Data;

namespace backend.BussinessLogic
{
    public class OrderBusinessLogic
    {
        public IUnitofWork unitofWork;
        public IMapper mapper;
        public DataContext context;
        public OrderBusinessLogic(IUnitofWork _unitofWork ,IMapper _mapper , DataContext context)
        {
            unitofWork = _unitofWork;
            mapper = _mapper;
            this.context = context;
        }

        //list order
        public async Task<IReadOnlyList<Order>> SelectAllOrder()
        {
            var data = await unitofWork.Repository<Order>().GetAllAsync();
            return data;
        }

        //create order
        public async Task<Order> Create(Order order)
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
            }else
            {
                return order;
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

            using (var transaction = context.Database.BeginTransaction())
            {
                try
                {
                    var existingOrder = await unitofWork.Repository<Order>().GetByIdAsync(id);
                    if (existingOrder == null)
                    {
                        throw new NotFoundExceptions("not found");
                    }

                    var orderDetailHaveOrderId = await unitofWork.Repository<OrderDetail>().GetAllWithAsync(new OrderDeleteOrderDetailSpec(id));
                    if (orderDetailHaveOrderId.Any())
                    {
                        await unitofWork.Repository<OrderDetail>().DeleteRange(orderDetailHaveOrderId);
                    }

                    await unitofWork.Repository<Order>().Delete(existingOrder);

                    var check = await unitofWork.Complete();
                    if (check < 1)
                    {
                        throw new BadRequestExceptions("chua dc thuc thi");
                    }

                    transaction.Commit(); // Commit giao dịch nếu mọi thứ thành công
                }
                catch (Exception ex)
                {
                    transaction.Rollback(); // Rollback giao dịch nếu có ngoại lệ
                    throw ex;
                }
            }
        }
        public async Task<Order> GetEntityByCondition(int TourDetailID)
        {
            var spec = new OrderSpecByTourDetailID(TourDetailID);
            var check_duplicate_order = await unitofWork.Repository<Entity.Order>().GetEntityWithSpecAsync(spec);
            if(check_duplicate_order == null)
            {
                return null;
            }
            return check_duplicate_order;
        }

        //Page

        public async Task <Pagination<OrderDtos>> SelectAllOrderPagination (SpecParams specParams)
        {
            var spec = new SearchOrderSpec(specParams);
            var orders = await unitofWork.Repository<Order>().GetAllWithAsync(spec);

            var data = mapper.Map<IReadOnlyList<Order>, IReadOnlyList<OrderDtos>>(orders);
            var locationPage = data.Skip((specParams.PageIndex - 1) * specParams.PageSize).Take(specParams.PageSize).ToList();

            //var countSpec = new SearchOrderSpec(specParams);
            var count = await unitofWork.Repository<Order>().GetCountWithSpecAsync(spec);
            //làm tròn
            var totalPageIndex = count % specParams.PageSize == 0 ? count / specParams.PageSize : (count / specParams.PageSize) + 1;

            var pagination = new Pagination<OrderDtos>(specParams.PageIndex, specParams.PageSize, locationPage, count, totalPageIndex);

            return pagination;
        }
    }
}
