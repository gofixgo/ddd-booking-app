using System.Threading.Tasks;
using Accessibility.Domain.SharedKernel;
using Management.Facilities.Events;
using MassTransit;
using MediatR;
using Accessibility.Application.Facilities.Commands.ChangeOfferStatus;
using Accessibility.Application.Facilities;

namespace Accessibility.Infrastructure.IntegrationEvents.EventHandling.Facilities
{
    public class OfferActivatedConsumer : IConsumer<OfferActivated>
    {
        private readonly IMediator mediator;

        public OfferActivatedConsumer(IMediator mediator)
        {
            this.mediator = mediator;
        }

        public async Task Consume(ConsumeContext<OfferActivated> context)
        {
            var id = context.Message.OfferId;

            await mediator.Send(new ChangeOfferStatusCommand(
                new OfferId(id),
                EntityStatus.active
            ));
        }
    }
}
