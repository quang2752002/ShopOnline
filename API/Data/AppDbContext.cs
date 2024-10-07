using API.Models.Entity;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.Reflection.Emit;
using WebApiWithRoleAuthentication.Models;

namespace WebApiWithRoleAuthentication.Data
{
    public class AppDbContext : IdentityDbContext<User>
    {
       

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {

        }
     
        public AppDbContext() { }
        public DbSet<Cart> Carts { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Contact> Contacts { get; set; }


        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            
            builder.Entity<User>()
                .ToTable("AspNetUsers")
                .HasDiscriminator<string>("Discriminator")
                .HasValue<User>("User"); 
        }


    }
}
