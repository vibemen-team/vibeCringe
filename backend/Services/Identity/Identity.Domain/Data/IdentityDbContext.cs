using Identity.Domain.Data.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Identity.Domain.Data
{
    public class IdentityDbContext : IdentityDbContext<IdentityUser>
    {
        public DbSet<ChatMessage> ChatMessages { get; set; }
        public IdentityDbContext(DbContextOptions<IdentityDbContext> options) : base(options)
        {

        }
        public IdentityDbContext()
        {
        }
        //protected override void OnModelCreating(ModelBuilder modelBuilder)
        //{
        //    //modelBuilder.Entity<ChatMessage>()
        //    //    .HasOne(x => x.Sender)
        //    //    .WithMany()
        //    //    .HasForeignKey(x => x.SenderId);
        //}
    }
}
