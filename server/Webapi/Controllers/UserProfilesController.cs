using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Webapi.Models;

namespace Webapi.Controllers
{
  [Route("api/v1/user_profiles")]
  [ApiController]
  public class UserProfilesController : ControllerBase
  {
    private readonly UserManager<ApplicationUser> userManager;

    public UserProfilesController(UserManager<ApplicationUser> userManager)
    {
      this.userManager = userManager;
    }

    [HttpGet]
    [Authorize(Roles = "Customer")]
    public async Task<ActionResult> GetUserProfile()
    {
      string userId = User.Claims
        .First(claim => claim.Type == "UserID")
        .Value;

      var user = await this.userManager.FindByIdAsync(userId);

      return Ok(new
      {
        user.FullName,
        user.Email,
        user.UserName
      });
    }

    [HttpGet("admin")]
    [Authorize(Roles = "Admin")]
    public string GetForAdmin() => "Web method for admin";

    [HttpGet("customer")]
    [Authorize(Roles = "Customer")]
    public string GetForCustomer() => "Web method for admin";

    [HttpGet("admin_or_customer")]
    [Authorize(Roles = "Admin,Customer")]
    public string GetAdmin() => "Web method for admin and customer";

  }
}