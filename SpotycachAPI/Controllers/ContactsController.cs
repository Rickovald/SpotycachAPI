using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SpotycachAPI.Data;
using SpotycachAPI.Models.Contacts;

namespace SpotycachAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ContactsController : Controller
    {
        private readonly ApiDbContext _context;

        public ContactsController(ApiDbContext dbContext)
        {
            this._context = dbContext;
        }

        
        [HttpGet]
        public async Task<IActionResult> GetContacts()
        {
            return Ok(await _context.Contacts.ToListAsync());
        }

        [HttpGet]
        [Route("{id:guid}")]
        public async Task<IActionResult> GetContactById([FromRoute] Guid id)
        {
            var contact = await _context.Contacts.FindAsync(id);

            if (contact == null)
            {
                return NotFound();
            }
            return Ok(contact);
        }

        [HttpPost]
        public async Task<IActionResult> AddContact(AddContactRequest addContactRequest)
        {
            var contact = new User()
            {
                Id = Guid.NewGuid(),
                Address = addContactRequest.Address,
                Email = addContactRequest.Email,
                FullName = addContactRequest.FullName,
                Phone = addContactRequest.Phone
            };
            await _context.Contacts.AddAsync(contact);
            await _context.SaveChangesAsync();

            return Ok(contact);

        }

        [HttpPut]
        [Route("{id:guid}")]
        public async Task<IActionResult> UpdateContact([FromRoute] Guid id, UpdateContactRequest updateContactRequest)
        {
            var contact = await _context.Contacts.FindAsync(id);
            
            if (contact != null)
            {
                contact.Address = updateContactRequest.Address;
                contact.Email = updateContactRequest.Email;
                contact.FullName = updateContactRequest.FullName;
                contact.Phone = updateContactRequest.Phone;
                
                await _context.SaveChangesAsync();

                return Ok(contact);
            }

            

            return NotFound();

        }

        [HttpDelete]
        [Route("{id:guid}")]
        public async Task<ActionResult> DeleteContact([FromRoute] Guid id)
        {
            var contact = await _context.Contacts.FindAsync(id);

            if (contact != null)
            {
                _context.Remove(contact);
                await _context.SaveChangesAsync();

                return Ok(contact );
            }
            return NotFound(contact);
        }
    }
}
