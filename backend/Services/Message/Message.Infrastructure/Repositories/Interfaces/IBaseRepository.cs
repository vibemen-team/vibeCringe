namespace Message.Infrastructure.Repositories.Interfaces
{
    public interface IBaseRepository<T>
    {
        Task<T> GetByIdAsync(string id);
        Task<List<T>> GetAllAsync();
        Task AddAsync(T entity);
        void Update(T entity);
        void Delete(string id);
        Task SaveAsync();
    }
}
