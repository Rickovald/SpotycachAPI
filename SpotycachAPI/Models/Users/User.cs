namespace SpotycachAPI.Models.Users
{
    public class User
    {
        public Guid Id { get; set; }
        public string Username { get; set; } = string.Empty;
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public long Phone { get; set; }
        public string Address { get; set; }

    }
}
