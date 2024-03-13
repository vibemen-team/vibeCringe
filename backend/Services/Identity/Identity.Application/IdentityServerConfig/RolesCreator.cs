using Microsoft.AspNetCore.Identity;

namespace Identity.Application.IdentityServer
{
    public class RolesCreator
    {
        public static async Task CreateRolesAsync(RoleManager<IdentityRole> roleManager)
        {
            if (await roleManager.FindByNameAsync("Visitor") is null)
            {
                await roleManager.CreateAsync(new IdentityRole("Visitor"));
            }

            if (await roleManager.FindByNameAsync("Admin") is null)
            {
                await roleManager.CreateAsync(new IdentityRole("Admin"));
            }
        }

        //TODO: SEEMS LIKE ITS USELESS PEACE OF DOGSHIT, BUT IM NOT SURE. SO NOW ONLY COMMENT        
        //public static async Task CreateUsersAsync(UserManager<IdentityUser> userManager)
        //{
        //    if (await userManager.FindByEmailAsync("admin@gmail.com") is null)
        //    {
        //        var admin = new IdentityUser
        //        {
        //            UserName = "Admin",
        //            Email = "admin@gmail.com"
        //        };

        //        await userManager.CreateAsync(admin, "AdminPassword");

        //        await userManager.AddToRoleAsync(admin, "Admin");
        //    }
        //}
    }
}
