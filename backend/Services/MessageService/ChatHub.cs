using Message.Infrastructure;
using Message.Infrastructure.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using System.Security.Claims;

namespace MessageService
{
    [Authorize]
    public class ChatHub : Hub
    {
        private readonly BaseService _service;

        public ChatHub(BaseService service)
        {
            _service = service;
        }

        public async Task Send(string message)
        {
            var userID = this.Context.User.FindFirst(ClaimTypes.NameIdentifier).Value;

            await _service.SendMessage(userID, message);

            var item = new MessageModel
            {
                SenderId = userID,
                MessageText = message
            };
            await this.Clients.All.SendAsync("Send", item);
        }
    }
}
