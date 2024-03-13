using Confluent.Kafka;
using static Confluent.Kafka.ConfigPropertyNames;

namespace Kafka.Producers
{
    public class SimpleStringProducer : IKafkaProducer<string, string>
    {
        private readonly IProducer<string, string> _producer;

        public SimpleStringProducer()
        {
            var _config = new ProducerConfig { BootstrapServers = "kafka:9092" };
            _producer = new ProducerBuilder<string, string>(_config).Build();
        }
        public void Dispose()
        {
            throw new NotImplementedException();
        }

        public async Task ProduceAsync(string key, string value)
        {
            await _producer.ProduceAsync("test-topic", new Message<string, string> { Key=key, Value = value });
        }
    }
}
