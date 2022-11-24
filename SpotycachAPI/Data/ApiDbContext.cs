using Microsoft.EntityFrameworkCore;
using SpotycachAPI.Models.Contacts;
using SpotycachAPI.Models.Users;

namespace SpotycachAPI.Data
{
    public class ApiDbContext: DbContext
    {
        public ApiDbContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<Contacts> Contacts { get; set; }
        public DbSet<User> Users { get; set; }
    }
}
