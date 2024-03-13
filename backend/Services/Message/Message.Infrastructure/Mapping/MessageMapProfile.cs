using AutoMapper;
using Identity.Domain.Data.Entities;

namespace Message.Infrastructure.Mapping
{
    public class MessageMapProfile : Profile
    {
        public MessageMapProfile()
        {
            CreateMap<ChatMessage, MessageModel>()
                .ForMember(x => x.SenderName, opt => opt.MapFrom(x => x.Sender.UserName))
                .ForMember(x => x.SenderId, opt => opt.MapFrom(x => x.Sender.Id))
                .ForMember(x => x.ReceiverId, opt => opt.MapFrom(x => x.Receiver.Id))
                .ForMember(x => x.ReceiverName, opt => opt.MapFrom(x => x.Receiver.UserName));
        }
    }
}
