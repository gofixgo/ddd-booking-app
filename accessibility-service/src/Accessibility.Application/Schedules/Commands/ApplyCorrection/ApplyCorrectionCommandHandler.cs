using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Accessibility.Domain.Schedules;
using Accessibility.Domain.SharedKernel;
using MediatR;
using Core.Domain.UnitOfWork;
using Core.Commands;

namespace Accessibility.Application.Schedules.Commands.ApplyCorrection
{
    public class ApplyCorrectionCommandHandler : ICommandHandler<ApplyCorrectionCommand>
    {
        private readonly IScheduleRepository repository;
        private readonly IUnitOfWork unitOfWork;

        public ApplyCorrectionCommandHandler(IScheduleRepository repository, IUnitOfWork unitOfWork)
        {
            this.repository = repository;
            this.unitOfWork = unitOfWork;
        }

        public async Task<Unit> Handle(ApplyCorrectionCommand request, CancellationToken cancellationToken)
        {
            var schedule = await repository.GetByIdAsync(new ScheduleId(request.ScheduleId), new FacilityId(request.FacilityId));

            schedule.CreateCorrection(request.Availabilities.Select(a => new Domain.Schedules.Availabilities.AvailabilityData(
                new EmployeeId(a.EmployeeId),
                new PeriodOfTime(a.StartTime, a.EndTime),
                new EmployeeId(a.CreatorId))).ToList()
            );

            schedule.IncreaseVersion();

            return Unit.Value;
        }
    }
}
