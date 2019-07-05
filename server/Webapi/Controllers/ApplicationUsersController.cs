using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Webapi.Models;

namespace Webapi.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class ApplicationUsersController : ControllerBase
  {
    private UserManager<ApplicationUser> userManager;
    private SignInManager<ApplicationUser> signInManager;

    private readonly AuthenticationContext authCtx;

    public ApplicationUsersController(
      UserManager<ApplicationUser> userManager,
      SignInManager<ApplicationUser> signInManager,
      AuthenticationContext authCtx)
    {
      this.userManager = userManager;
      this.signInManager = signInManager;
      this.authCtx = authCtx;
    }

    // POST api/applicationuser/register
    [HttpPost("register")]
    public async Task<ActionResult> CreateApplicationUser(ApplicationUserModel model)
    {
      var applicationUser = new ApplicationUser
      {
        UserName = model.UserName,
        Email = model.Email,
        FullName = model.FullName
      };

      try
      {
        var result = await this.userManager.CreateAsync(applicationUser, model.Password);
        return Ok(result);
      }
      catch (System.Exception ex)
      {
        throw ex;
      }
    }

    [HttpGet]
    public async Task<IEnumerable<object>> GetAll()
    {
      return
        this.authCtx.ApplicationUsers
          .Select(user => new
          {
            Id = user.Id,
            UserName = user.UserName,
            Email = user.Email,
            FullName = user.FullName
          });
    }
  }
}
