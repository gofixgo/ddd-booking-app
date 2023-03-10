using System;
using Accessibility.Domain.Schedules;
using Accessibility.Domain.SharedKernel;
using Core.Database;
using Dapper;

namespace Accessibility.Application.Schedules.DomainServices
{
    public class SchedulePeriodOfTimeChecker : ISchedulePeriodOfTimeChecker
    {
        private readonly ISqlConnectionFactory sqlConnectionFactory;

        public SchedulePeriodOfTimeChecker(ISqlConnectionFactory sqlConnectionFactory)
        {
            this.sqlConnectionFactory = sqlConnectionFactory;
        }

        public bool IsAvailable(FacilityId facilityId, DateTime startDate, DateTime endDate)
        {
            var connection = sqlConnectionFactory.GetConnection();

            var result = connection.QuerySingleOrDefault<int?>(
                @"SELECT 1
                FROM accessibility.schedules
                WHERE
                    facility_id = @FacilityId AND
                    start_Date < @EndDate AND
                    @StartDate < end_date
                LIMIT 1;",
                new {
                    FacilityId = facilityId.Value,
                    StartDate = startDate,
                    EndDate = endDate
                });
            
            return !result.HasValue;
        }

        public bool IsAvailableForModify(FacilityId facilityId, ScheduleId scheduleId, DateTime startDate, DateTime endDate)
        {
            var connection = sqlConnectionFactory.GetConnection();

            var result = connection.QuerySingleOrDefault<int?>(
                @"SELECT 1
                FROM accessibility.schedules
                WHERE
                    facility_id = @FacilityId AND
                    schedule_id != @ScheduleId AND
                    start_Date < @EndDate AND
                    @StartDate < end_date
                LIMIT 1;",
                new {
                    FacilityId = facilityId.Value,
                    ScheduleId = scheduleId.Value,
                    StartDate = startDate,
                    EndDate = endDate
                });
            
            return !result.HasValue;
        }
    }
}
