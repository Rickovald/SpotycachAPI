using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SpotycachAPI.Models.Users;
using System.Security.Cryptography;

namespace SpotycachAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        public static User user = new User();
        [HttpPost("register")]
        public async Task<ActionResult<User>> Register(UserRequest request)
        {
            CreatePasswordHash(request.Password, out byte[] passwodHash, out byte[] passwodSalt);

            user.Username = request.Username;
            user.PasswordHash = passwodHash;
            user.PasswordSalt = passwodSalt;

            return Ok(user);
        }

        private void CreatePasswordHash(string password, out byte[] passwodHash, out byte[] passwodSalt)
        {
            using(var hmac = new HMACSHA512())
            {
                passwodSalt = hmac.Key;
                passwodHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }
    }
}
