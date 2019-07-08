using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
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

    private readonly IConfiguration config;

    public ApplicationUsersController(
      UserManager<ApplicationUser> userManager,
      SignInManager<ApplicationUser> signInManager,
      AuthenticationContext authCtx,
      IConfiguration config)
    {
      this.userManager = userManager;
      this.signInManager = signInManager;
      this.authCtx = authCtx;
      this.config = config;
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
        await this.authCtx.ApplicationUsers
          .Select(user => new
          {
            Id = user.Id,
            UserName = user.UserName,
            Email = user.Email,
            FullName = user.FullName
          })
          .ToListAsync();
    }

    [HttpPost]
    [Route("login")]
    public async Task<ActionResult> Login([FromBody] LoginModel loginModel)
    {
      var user = await this.userManager.FindByNameAsync(loginModel.UserName);

      if (
        user == null ||
        await this.userManager.CheckPasswordAsync(user, loginModel.Password) == false
        )
      {
        return BadRequest(new
        {
          message = "UserName not found or password is incorrect."
        });
      }

      var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(this.config["JWT_SECRET"].ToString()));
      var algorithm = SecurityAlgorithms.HmacSha256Signature;

      var tokenDescriptor = new SecurityTokenDescriptor
      {
        Subject = new ClaimsIdentity(new Claim[]
        {
          new Claim("UserID", user.Id.ToString())
        }),
        Expires = DateTime.UtcNow.AddDays(1),
        SigningCredentials = new SigningCredentials(key, algorithm)
      };
      var tokenHandler = new JwtSecurityTokenHandler();
      var securityToken = tokenHandler.CreateToken(tokenDescriptor);
      var token = tokenHandler.WriteToken(securityToken);

      return Ok(new
      {
        token
      });
    }
  }
}
