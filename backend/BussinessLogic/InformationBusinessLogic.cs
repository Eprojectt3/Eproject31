using System.Net;
using System.Net.Mail;
using AutoMapper;

using backend.Dao.Specification;
using backend.Dao.Specification.InformationSpec;
using backend.Dtos.InformationDtos;
using backend.Dtos.InformationMailDto;
using backend.Entity;
using backend.Exceptions;
using backend.Helper;
using webapi.Dao.UnitofWork;

namespace backend.BussinessLogic
{
    public class InformationBusinessLogic
    {
        public IUnitofWork unitofWork;
        public IMapper mapper;
        private readonly SmtpClient _smtpClient;
        private readonly IConfiguration _configuration;

        public InformationBusinessLogic(
            IUnitofWork _unitofWork,
            IMapper mapper,
            IConfiguration configuration
        )
        {
            unitofWork = _unitofWork;
            this.mapper = mapper;
            _configuration = configuration;

            _smtpClient = new SmtpClient
            {
                Host = _configuration["SmtpConfig:SmtpServer"],
                Port = int.Parse(_configuration["SmtpConfig:Port"]),
                UseDefaultCredentials = false,
                Credentials = new NetworkCredential(
                    _configuration["SmtpConfig:Username"],
                    _configuration["SmtpConfig:Password"]
                ),
                EnableSsl = true,
                DeliveryMethod = SmtpDeliveryMethod.Network
            };
        }

        //list information
        public async Task<IReadOnlyList<Information>> SelectAllInformation()
        {
            var data = await unitofWork.Repository<Information>().GetAllAsync();
            return data;
        }

        //create information
        public async Task Create(InformationMailDto information)
        {
            Information information1 = new Information();
            information1.Id = information.Id;
            information1.Location = information.Location;
            information1.Transportation = information.Transportation;
            information1.Departure_Date = information.Departure_Date;
            information1.End_Date = information.End_Date;
            information1.Destination = information.Destination;
            information1.Description = information.Description;

            if (information is null)
            {
                throw new NotFoundExceptions("Cattegory not found");
            }
            await unitofWork.Repository<Information>().AddAsync(information1);
            var check = await unitofWork.Complete();

            var mailMessage = new MailMessage
            {
                From = new MailAddress(_configuration["SmtpConfig:Username"]),
                Subject = "Karnel Travel Guide",
                Body =
                    $"Thank you for your trust in using our services. We will contact you in the shortest possible time, usually within 1 day at most",
                IsBodyHtml = true
            };

            if (check < 1)
            {
                throw new BadRequestExceptions("chua dc thuc thi");
            }

            mailMessage.To.Add(information.Email);

            _smtpClient.Send(mailMessage);
        }

        //update information
        public async Task Update(Information information, int id)
        {
            if (information is null)
            {
                throw new NotFoundExceptions("not found");
            }

            var existingInformation = await unitofWork.Repository<Information>().GetByIdAsync(id);

            if (existingInformation is null)
            {
                throw new NotFoundExceptions("not found");
            }
            existingInformation.UpdateDate = information.UpdateDate;
            existingInformation.UpdateBy = information.UpdateBy;
            existingInformation.IsActive = information.IsActive;
            existingInformation.Location = information.Location;
            existingInformation.Transportation = information.Transportation;
            existingInformation.Departure_Date = information.Departure_Date;
            existingInformation.Description = information.Description;
            existingInformation.End_Date = information.End_Date;
            existingInformation.Destination = information.Destination;

            await unitofWork.Repository<Information>().Update(existingInformation);
            var check = await unitofWork.Complete();
            if (check < 1)
            {
                throw new BadRequestExceptions("chua dc thuc thi");
            }
        }

        //delete information
        public async Task Delete(int id)
        {
            var existingInformation = await unitofWork.Repository<Information>().GetByIdAsync(id);
            if (existingInformation == null)
            {
                throw new NotFoundExceptions("not found");
            }
            await unitofWork.Repository<Information>().Delete(existingInformation);
            var check = await unitofWork.Complete();
            if (check < 1)
            {
                throw new BadRequestExceptions("chua dc thuc thi");
            }
        }

        //get information by id
        public async Task GetByInformationId(int id)
        {
            var existingHotel = await unitofWork.Repository<Information>().GetByIdAsync(id);
            if (existingHotel == null)
            {
                throw new NotFoundExceptions("not found");
            }
        }

        public async Task<Pagination<InformationDto>> SelectAllInformationPagination(
            SpecParams specParams
        )
        {
            var spec = new SearchInformationSpec(specParams);
            var resorts = await unitofWork.Repository<Information>().GetAllWithAsync(spec);

            var data = mapper.Map<IReadOnlyList<Information>, IReadOnlyList<InformationDto>>(
                resorts
            );
            var staffPage = data.Skip((specParams.PageIndex - 1) * specParams.PageSize)
                .Take(specParams.PageSize)
                .ToList();

            var countSpec = new SearchInformationSpec(specParams);
            var count = await unitofWork.Repository<Information>().GetCountWithSpecAsync(countSpec);

            var totalPageIndex =
                count % specParams.PageSize == 0
                    ? count / specParams.PageSize
                    : (count / specParams.PageSize) + 1;

            var pagination = new Pagination<InformationDto>(
                specParams.PageIndex,
                specParams.PageSize,
                staffPage,
                count,
                totalPageIndex
            );

            return pagination;
        }
    }
}
