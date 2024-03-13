using Microsoft.AspNetCore.Identity;

namespace Identity.Domain.Data.Entities
{
    public class ChatMessage
    {
        public Guid Id { get; set; }
        public string SenderId { get; set; }
        public IdentityUser Sender { get; set; }
        public string ReceiverId { get; set; }
        public IdentityUser Receiver { get; set; }
        public string MessageText { get; set; }
        public DateTime SendedTime { get; set; }
    }
}
