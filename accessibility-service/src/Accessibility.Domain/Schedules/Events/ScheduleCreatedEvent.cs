using Core.Domain;

namespace Accessibility.Domain.Schedules
{
    public class ScheduleCreatedEvent : DomainEventBase
    {
        public ScheduleCreatedEvent(ScheduleId id)
        {
            Id = id;
        }
        public ScheduleId Id { get; }
    }
}
