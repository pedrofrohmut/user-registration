using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations.Schema;

namespace Webapi.Models
{
  public class ApplicationUser : IdentityUser
  {
    [Column(TypeName = "NVARCHAR(150)")]
    public string FullName { get; set; }
  }
}
