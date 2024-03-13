using AutoMapper;
using Confluent.Kafka;
using Kafka.Producers;
using Message.Infrastructure;
using Message.Infrastructure.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace MessageService.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MessageController : ControllerBase
    {

        private readonly ILogger<MessageController> _logger;
        private readonly IKafkaProducer<Null, string> _producer;
        private readonly MessageRepository _mesasgeRepository;
        private readonly IMapper _mapper;

        public MessageController(ILogger<MessageController> logger,/* IKafkaProducer<Null, string> producer,*/ MessageRepository baseRepository, IMapper mapper)
        {
            _logger = logger;
            //_producer = producer;
            _mesasgeRepository = baseRepository;
            _mapper = mapper;
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] string message)
        {
            await _producer.ProduceAsync(null, message);
            return Ok();
        }
        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetAllMessage()
        {
            var userID = this.User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var result = await _mesasgeRepository.GetAllAsync();
            var items = _mapper.Map<List<MessageModel>>(result.OrderBy(x=>x.SendedTime));
            foreach (var item in items)
            {
                if (item.SenderId.Equals(userID))
                {
                    item.isMine=true;
                    //item.SendedTime = DateTime.ParseExact(item.SendedTime.ToShortTimeString()+ item.SendedTime.ToShortTimeString(), "yyyy-MM-dd HH:mm:ss,fff",
                    //                   System.Globalization.CultureInfo.InvariantCulture);
                }
            }
            return Ok(items);
        }
    }
}