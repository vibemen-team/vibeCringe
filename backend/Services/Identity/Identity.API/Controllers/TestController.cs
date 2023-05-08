using Identity.Application.Models;
using IdentityModel.Client;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Identity.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TestController : ControllerBase
    {
        private readonly ILogger<TestController> _logger;

        public TestController(ILogger<TestController> logger)
        {
            _logger = logger;
        }

        [HttpGet("ClosedRoute")]
        [Authorize]
        [ProducesResponseType(typeof(Nullable), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(Nullable), StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult> Get()
        {
            var userID =  this.User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return Ok(userID);
        }
        [HttpGet("TestLogg",Name = "TestLog")]
        public ActionResult Get2()
        {
            _logger.LogInformation("Info");
            _logger.LogWarning("Warning");
            return Ok();
        }
    }
}
