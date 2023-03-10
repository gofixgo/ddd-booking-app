using System;
using System.Threading.Tasks;

using Accessibility.Application.BookedRecords.Queries.GetBookedRecordsOfCustomer;
using Accessibility.Application.BookedRecords.Queries.GetBookedRecordsOfFacility;
using Core.Queries;

namespace Accessibility.Application.BookedRecords.Queries
{
    public interface IBookedRecordQueryRepository
    {
        Task<QueryCollectionResult<BookedRecordDto>> GetBookedRecords(Guid customerId, GetBookedRecordsOfCustomerQueryParams @params);
        Task<QueryCollectionResult<BookedRecordDto>> GetBookedRecords(Guid facilityId, GetBookedRecordsOfFacilityQueryParams @params);
    }
}
