using System.Security.Claims;
using webapi.Model;

namespace webapi.Dao.IServices
{
    public interface IJWTManagerService
    {
        Tokens GenerateToken(string username, string role);
        Tokens GenerateRefreshToken(string username, string role);
        ClaimsPrincipal GetPrincipalFromExpiredToken(string token);
    }
}
