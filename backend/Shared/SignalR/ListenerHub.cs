using Confluent.Kafka;
using Microsoft.AspNetCore.SignalR;

namespace SignalR
{
    public class ListenerHub : Hub
    {
        public async Task Send(Message<string,string> message)
        {
            await this.Clients.All.SendAsync("Send", message);
        }
    }
}
