using Confluent.Kafka;
using Kafka.Producers;
using Message.Infrastructure.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using System.Security.Claims;
using System.Threading.Channels;

namespace SignalR
{
    [Authorize]
    public class StreamHub : Hub
    {
        private readonly IKafkaProducer<string, string> _producer;
        private readonly BaseRepository _repository;

        public StreamHub(IKafkaProducer<string, string> producer, BaseRepository repository)
        {
            _producer = producer;
            _repository = repository;
        }
        public ChannelReader<int> Counter(
            int count,
            int delay,
            CancellationToken cancellationToken)
        {
            var channel = Channel.CreateUnbounded<int>();

            // We don't want to await WriteItemsAsync, otherwise we'd end up waiting 
            // for all the items to be written before returning the channel back to
            // the client.
            _ = WriteItemsAsync(channel.Writer, count, delay, cancellationToken);

            return channel.Reader;
        }

        private async Task WriteItemsAsync(
            ChannelWriter<int> writer,
            int count,
            int delay,
            CancellationToken cancellationToken)
        {
            Exception localException = null;
            try
            {
                for (var i = 0; i < count; i++)
                {
                    await writer.WriteAsync(i, cancellationToken);

                    // Use the cancellationToken in other APIs that accept cancellation
                    // tokens so the cancellation can flow down to them.
                    await Task.Delay(delay, cancellationToken);
                }
            }
            catch (Exception ex)
            {
                localException = ex;
            }
            finally
            {
                writer.Complete(localException);
            }
        }


        public async Task UploadStream(ChannelReader<string> stream)
        {
            while (await stream.WaitToReadAsync())
            {
                while (stream.TryRead(out var item))
                {
                    // do something with the stream item
                    //Console.WriteLine(item);
                    //var accessToken = Context.GetHttpContext().Request.Query["access_token"];
                    var userID = this.Context.User.FindFirst(ClaimTypes.NameIdentifier).Value;
                    var receiverID = await _repository.GetAnotherUserAsync(userID);
                    _producer.ProduceAsync(receiverID,item);
                }
            }
        }

        //public async Task UploadStream(IAsyncEnumerable<string[]> stream)
        //{
        //    await foreach (var item in stream)
        //    {
        //        Console.Write(item + " ");
        //    }
        //    Console.WriteLine();
        //}
        public async Task Send(string message)
        {
            await this.Clients.All.SendAsync("Send", message);
        }
    }
}
