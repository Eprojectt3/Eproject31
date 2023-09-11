using Microsoft.EntityFrameworkCore;
using webapi.Model;

namespace webapi.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options)
            : base(options) { }

        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<UserRefreshTokens> UserRefreshTokens { get; set; }
        public virtual DbSet<Role> Roles { get; set; }
        public virtual DbSet<Slug> Slugs { get; set; }
        public virtual DbSet<ForgotPasswordRequest> ForgotPasswordRequests { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().HasIndex(ul => new { ul.Username }).IsUnique();
        }
    }
}
