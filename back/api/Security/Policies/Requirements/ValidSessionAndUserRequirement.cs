using Microsoft.AspNetCore.Authorization;

namespace api.Security.Policies.Requirements;

public class ValidSessionAndUserRequirement : IAuthorizationRequirement
{
}