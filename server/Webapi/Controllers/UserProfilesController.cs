using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Webapi.Models;

namespace Webapi.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class UserProfilesController : ControllerBase
  {
    private readonly UserManager<ApplicationUser> userManager;

    public UserProfilesController(UserManager<ApplicationUser> userManager)
    {
      this.userManager = userManager;
    }

    [HttpGet]
    [Authorize]
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
  }
}