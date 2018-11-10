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

            var tokenClient = new TokenClient(disco.TokenEndpoint, "client", "clientcredentials");
            var tokenResponse = await tokenClient.RequestClientCredentialsAsync("petstore");

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
            }
            else
            {
                Console.ForegroundColor = ConsoleColor.Green;
                var content = await response.Content.ReadAsStringAsync();
                Console.WriteLine(JArray.Parse(content));
            }
        }
    }
}
