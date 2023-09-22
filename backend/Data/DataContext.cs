using backend.Entity;
using Microsoft.EntityFrameworkCore;

namespace webapi.Data
{
  public class DataContext : DbContext
  {
    public DataContext(DbContextOptions<DataContext> options)
        : base(options) { }

    public DataContext() { }

    public virtual DbSet<User> Users { get; set; }
    public virtual DbSet<UserRefreshTokens> UserRefreshTokens { get; set; }
    public virtual DbSet<Role> Roles { get; set; }
    public virtual DbSet<Slug> Slugs { get; set; }
    public virtual DbSet<ForgotPasswordRequest> ForgotPasswordRequests { get; set; }
    public virtual DbSet<Category> Category { get; set; }
    public virtual DbSet<Discount> Discount { get; set; }
    public virtual DbSet<FeedBack> FeedBack { get; set; }
    public virtual DbSet<Hotel> Hotels { get; set; }
    public virtual DbSet<Itinerary> Itinerarie { get; set; }
    public virtual DbSet<Location1> Locations { get; set; }
    public virtual DbSet<Order> Order { get; set; }
    public virtual DbSet<OrderDetail> OrderDetail { get; set; }
    public virtual DbSet<Resorts> Resorts { get; set; }
    public virtual DbSet<Restaurant> Restaurant { get; set; }
    public virtual DbSet<Tour> Tour { get; set; }
    public virtual DbSet<Transportation> Transportation { get; set; }
    public virtual DbSet<Service> Service { get; set; }
    public virtual DbSet<Booking> Booking { get; set; }
    public virtual DbSet<Staff> Staff { get; set; }

       
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options)
            : base(options) { }
        public DataContext()
        {
            
        }
        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<UserRefreshTokens> UserRefreshTokens { get; set; }
        public virtual DbSet<Role> Roles { get; set; }
        public virtual DbSet<Slug> Slugs { get; set; }
        public virtual DbSet<ForgotPasswordRequest> ForgotPasswordRequests { get; set; }
        public virtual DbSet<Category> Category { get; set; }
        public virtual DbSet<Discount> Discount { get; set; }
        public virtual DbSet<FeedBack> FeedBack { get; set; }
        public virtual DbSet<Hotel> Hotels { get; set; }
        public virtual DbSet<Itinerary> Itinerarie { get; set; }
        public virtual DbSet<Location1> Locations{ get; set; }
        public virtual DbSet<Order> Order { get; set; }
        public virtual DbSet<OrderDetail> OrderDetail { get; set; }
        public virtual DbSet<Resorts> Resorts { get; set; }
        public virtual DbSet<Restaurant> Restaurant { get; set; }
        public virtual DbSet<Tour> Tour { get; set; }
        public virtual DbSet<Transportation> Transportation { get; set; }
        public virtual DbSet<Service> Service { get; set; }
        public virtual DbSet<Payment> OrderInfo { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().HasIndex(ul => new { ul.Username }).IsUnique();

            //delete cascade
            modelBuilder.Entity<Hotel>()
               .HasOne(h => h.location1)
               .WithMany(l => l.Hotels)
               .HasForeignKey(h => h.LocatinId)
               .IsRequired()
               .OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<Resorts>()
                .HasOne(h => h.Location)
                .WithMany(l => l.Resorts)
                .HasForeignKey(h => h.LocationId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<Restaurant>()
                .HasOne(h => h.Location)
                .WithMany(l => l.Restaurant)
                .HasForeignKey(h => h.LocationId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<Booking>()
                .HasOne(h => h.discount)
                .WithMany(l => l.bookings)
                .HasForeignKey(h => h.DiscountId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<Booking>()
                .HasOne(h => h.staff)
                .WithMany(b => b.Bookings)
                .HasForeignKey(b => b.StaffId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<Itinerary>()
               .HasOne(h => h.Location)
               .WithMany(b => b.Itineraries)
               .HasForeignKey(b => b.LocationID)
               .IsRequired()
               .OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<Booking>()
               .HasOne(h => h.staff)
               .WithMany(b => b.Bookings)
               .HasForeignKey(b => b.StaffId)
               .IsRequired()
               .OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<OrderDetail>()
               .HasOne(h => h.order)
               .WithMany(b => b.OrderDetails)
               .HasForeignKey(b => b.OrderID)
               .IsRequired()
               .OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<OrderDetail>()
               .HasOne(h => h.booking)
               .WithMany(b => b.OrderDetails)
               .HasForeignKey(b => b.BookigId)
               .IsRequired()
               .OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<OrderDetail>()
               .HasOne(h => h.Users)
               .WithMany(b => b.OrderDetails)
               .HasForeignKey(b => b.UserID)
               .IsRequired()
               .OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<Service>()
               .HasOne(h => h.book)
               .WithMany(b => b.Services)
               .HasForeignKey(b => b.BookingId)
               .IsRequired()
               .OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<Tour>()
               .HasOne(h => h.category)
               .WithMany(b => b.Tours)
               .HasForeignKey(b => b.category_id)
               .IsRequired()
               .OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<Tour>()
               .HasOne(h => h.transportation)
               .WithMany(b => b.Tours)
               .HasForeignKey(b => b.Transportation_ID)
               .IsRequired()
               .OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<Tour>()
               .HasOne(h => h.discount)
               .WithMany(b => b.Tours)
               .HasForeignKey(b => b.discount_Id)
               .IsRequired()
               .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
