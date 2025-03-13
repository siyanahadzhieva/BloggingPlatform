using System.ComponentModel.DataAnnotations;

namespace BlogApp.Models
{
    public class User
    {
        public int Id { get; set; }

        [Required, MaxLength(100)]
        public string Name { get; set; }

        [Required, MaxLength(100)]
        public string Email { get; set; }

        [Required]
        public string PasswordHash { get; set; }  // Store hashed passwords

        public ICollection<Post>? Posts { get; set; }

        public ICollection<Comment>? Comments { get; set; }
    }
}
