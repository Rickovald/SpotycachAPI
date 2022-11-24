namespace SpotycachAPI.Models.Contacts
{
    public class User
    {
        public Guid Id { get; set; }
        public string FullName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public long Phone { get; set; }
        public string Address { get; set; } = string.Empty;

    }
}
