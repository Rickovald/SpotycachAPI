using Microsoft.EntityFrameworkCore;
using SpotycachAPI.Models;

namespace SpotycachAPI.Data
{
    public class ContactsApiDbContext: DbContext
    {
        public ContactsApiDbContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<Contact> Contacts { get; set; }
    }
}
