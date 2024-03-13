using IdentityModel;
using IdentityServer4;
using IdentityServer4.Models;
using static IdentityServer4.IdentityServerConstants;

namespace Identity.Application.IdentityServer
{
    public static class IdentityConfiguration
    {
        public static IEnumerable<IdentityResource> IdentityResources =>
            new List<IdentityResource>
            {
                new IdentityResources.OpenId(),
                new IdentityResources.Profile(),
                new()
                {
                    Name = "roles",
                    DisplayName = "Roles",
                    UserClaims =
                    {
                        JwtClaimTypes.Role
                    }
                },
                new()
                {
                    Name = "id",
                    DisplayName = "Id",
                    UserClaims =
                    {
                        JwtClaimTypes.Id
                    }
                }
            };

        public static IEnumerable<ApiScope> ApiScopes =>
            new List<ApiScope>
            {
                new("SwaggerAPI"),
                new("BasketApi"),
                new("CatalogApi")
            };

        public static IEnumerable<ApiResource> ApiResources =>
            new List<ApiResource>
            {
                new("SwaggerAPI"),
                new("BasketAPI", new[]
                {
                    JwtClaimTypes.Id,
                    JwtClaimTypes.Role
                })
                {
                    Scopes = new List<string>
                    {
                        "BasketApi"
                    },
                    ApiSecrets = new List<Secret>
                    {
                        new("basketsecret".Sha256())
                    }
                },
                new("CatalogAPI", new[]
                {
                    JwtClaimTypes.Id,
                    JwtClaimTypes.Role
                })
                {
                    Scopes = new List<string>
                    {
                        "CatalogApi"
                    },
                    ApiSecrets = new List<Secret>
                    {
                        new("catalogsecret".Sha256())
                    }
                }
            };

        public static IEnumerable<Client> Clients =>
    new List<Client>
    {
        new Client
        {
            ClientId = "client_id_swagger",
            ClientSecrets = { new Secret("client_secret_swagger".Sha512()) },
            AllowedGrantTypes = GrantTypes.ResourceOwnerPassword,
            AllowedScopes = { "SwaggerAPI", StandardScopes.OpenId, StandardScopes.Profile }
        },
        new Client
        {
            ClientId = "api",
            ClientName = "ClientApi",
            AllowAccessTokensViaBrowser = true,
            ClientSecrets = new[]
            {
                new Secret("clientsecret".Sha512())
            },
            AllowedGrantTypes = GrantTypes.ResourceOwnerPassword,
            AllowedScopes =
            {
                StandardScopes.OpenId,
                "BasketApi",
                "OrdersApi"
            }
        }
    };
    }
}
