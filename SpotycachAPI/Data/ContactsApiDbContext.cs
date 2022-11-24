using Microsoft.EntityFrameworkCore;
using SpotycachAPI.Models.Contacts;

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
