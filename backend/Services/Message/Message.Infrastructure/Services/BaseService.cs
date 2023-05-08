using Identity.Domain.Data.Entities;
using Message.Infrastructure.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Message.Infrastructure.Services
{
    public class BaseService
    {
        private readonly BaseRepository _repository;

        public BaseService(BaseRepository repository)
        {
            _repository = repository;
        }
        public async Task SendMessage(string senderId, string message)
        {
            var entity = new ChatMessage
            {
                Id = Guid.NewGuid(),
                MessageText = message,
                SenderId = senderId,
                ReceiverId = await _repository.GetAnotherUserAsync(senderId),
                SendedTime = DateTime.UtcNow
            };
            await _repository.AddAsync(entity);
            await _repository.SaveAsync();
        }
    }
}
