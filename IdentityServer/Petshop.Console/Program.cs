using IdentityModel.Client;
using Newtonsoft.Json.Linq;
using System;
using System.Net.Http;
using System.Threading.Tasks;

namespace Petshop.ConsoleApp
{
    public class Program
    {
        public static void Main(string[] args) => MainAsync().GetAwaiter().GetResult();

        public static async Task MainAsync()
        {
            var idServerBase = "https://localhost:5001";
            var apiBase = "https://localhost:5011";
            var disco = await DiscoveryClient.GetAsync(idServerBase);
            if (disco.IsError)
            {
                Console.WriteLine(disco.Error);
                return;
            }

            TokenResponse tokenResponse = null;
            //Reason to use password grant vs client credentials: for password grant The access token will now contain a sub claim which uniquely identifies the user. 
            //This “sub” claim can be seen by examining the content variable after the call to the API and also will be displayed on the screen by the console application.
            //The presence(or absence) of the sub claim lets the API distinguish between calls on behalf of clients and calls on behalf of users.
            Console.WriteLine("Client Credentials (c) or User Login (u)?");
            var grantType = Console.ReadLine();
            switch (grantType)
            {
                case "c":
                    {
                        var tokenClient = new TokenClient(disco.TokenEndpoint, "client", "clientcredentials");
                        tokenResponse = await tokenClient.RequestClientCredentialsAsync("petstore");
                        break;
                    }
                case "u":
                    {
                        var tokenClient = new TokenClient(disco.TokenEndpoint, "ro.client", "resourceowner");
                        Console.Write("Enter username:");
                        Console.Out.Flush();
                        var username = Console.ReadLine();
                        Console.Write("Enter password:");
                        Console.Out.Flush();
                        var password = Console.ReadLine();
                        tokenResponse = await tokenClient.RequestResourceOwnerPasswordAsync(username, password, "petstore");
                        break;
                    }
                default:
                    {
                        Console.WriteLine("Unrecognized option selection. Type either \"c\" or \"u\".");
                        break;
                    }
            }

            if (tokenResponse.IsError)
            {
                Console.WriteLine(tokenResponse);
                return;
            }

            Console.WriteLine(tokenResponse.Json + "\n\n");

            var client = new HttpClient();
            client.SetBearerToken(tokenResponse.AccessToken);

            var response = await client.GetAsync(apiBase + "/api/identity");
            if (!response.IsSuccessStatusCode)
            {
                Console.ForegroundColor = ConsoleColor.Red;
                Console.WriteLine(response.StatusCode);
                Console.ReadKey();
            }
            else
            {
                Console.ForegroundColor = ConsoleColor.Green;
                var content = await response.Content.ReadAsStringAsync();
                Console.WriteLine(JArray.Parse(content));
                Console.ReadKey();
            }
        }
    }
}
