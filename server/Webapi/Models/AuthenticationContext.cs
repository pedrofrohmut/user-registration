using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Webapi.Models
{
  public class AuthenticationContext : IdentityDbContext
  {
    public AuthenticationContext(DbContextOptions<AuthenticationContext> options)
      :base(options) {}

    public DbSet<ApplicationUser> ApplicationUsers { get; set; }
  }
}
