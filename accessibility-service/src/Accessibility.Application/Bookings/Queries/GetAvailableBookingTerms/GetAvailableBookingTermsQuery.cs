using System;
using System.Collections.Generic;
using Core.Queries;

namespace Accessibility.Application.Bookings.Queries.GetAvailableBookingTerms
{
    public class GetAvailableBookingTermsQuery : IQuery<IEnumerable<AvailableBookingTermDto>>
    {
        public GetAvailableBookingTermsQuery(Guid facilityId, Guid offerId, DateTime dateFrom, DateTime dateTo, BookingRulesData bookingRules)
        {
            FacilityId = facilityId;
            OfferId = offerId;
            DateFrom = dateFrom;
            DateTo = dateTo;
            BookingRules = bookingRules;
        }

        public Guid FacilityId { get; }
        public Guid OfferId { get; }
        public DateTime DateFrom { get; }
        public DateTime DateTo { get; }
        public BookingRulesData BookingRules { get; }
    }
}
