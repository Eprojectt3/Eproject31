using backend.Entity;
using Microsoft.EntityFrameworkCore;

namespace webapi.Data
{
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
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().HasIndex(ul => new { ul.Username }).IsUnique();
        }
    }
}
