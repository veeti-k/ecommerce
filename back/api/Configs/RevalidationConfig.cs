namespace api.Configs;

public class RevalidationConfig
{
    public const string Position = "Revalidation";
    
    public string Secret { get; set; }
    public string FrontendRevalidationBaseUrl { get; set; }
}