using Identity.Domain.Data;
using Identity.Domain.Data.Entities;
using Message.Infrastructure.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Message.Infrastructure.Repositories
{
    public class BaseRepository : IBaseRepository<ChatMessage>
    {
        private readonly IdentityDbContext _dbContext;

        public BaseRepository(IdentityDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task AddAsync(ChatMessage entity)
        {
            await _dbContext.AddAsync(entity);
        }

        public void Delete(string id)
        {
            _dbContext.Remove(id);
        }

        public Task<List<ChatMessage>> GetAllAsync()
        {
            var items = _dbContext.ChatMessages.ToListAsync();
            return items;
        }

        public async Task<ChatMessage> GetByIdAsync(string id)
        {
            var item = await _dbContext.ChatMessages.FindAsync(id);
            return item;
        }

        public async Task SaveAsync()
        {
            await _dbContext.SaveChangesAsync();
        }

        public void Update(ChatMessage entity)
        {
            _dbContext.Update(entity);
        }
        public async Task<string> GetAnotherUserAsync(string id)
        {
            var user = await _dbContext.Users.FirstOrDefaultAsync(x => x.Id != id);
            return user.Id;

        }
    }
}
