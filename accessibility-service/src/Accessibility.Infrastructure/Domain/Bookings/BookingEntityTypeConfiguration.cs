using Accessibility.Domain.Bookings;
using Accessibility.Domain.Bookings.BookedRecords;
using Accessibility.Domain.SharedKernel;
using Accessibility.Infrastructure.Database;
using Core.Persistence.Postgres;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Accessibility.Infrastructure.Domain.Bookings
{
    internal sealed class BookingEntityTypeConfiguration : IEntityTypeConfiguration<Accessibility.Domain.Bookings.Booking>
    {
        public void Configure(EntityTypeBuilder<Accessibility.Domain.Bookings.Booking> builder)
        {
            builder.ToTable("bookings", SchemaNames.Booking);

            builder.HasKey(b => b.Id);
            builder.Property(b => b.Id).HasColumnName("booking_id");

            builder.Property("customerId").HasConversion(new StronglyTypedIdValueConverter<CustomerId>()).HasColumnName("customer_id");
            builder.Property(b => b.PublicCustomerId).HasConversion(new StronglyTypedIdValueConverter<PublicCustomerId>()).HasColumnName("public_customer_id");
            builder.Property(b => b.FacilityId).HasConversion(new StronglyTypedIdValueConverter<FacilityId>()).HasColumnName("facility_id");

            builder.Property(b => b.Status).HasConversion(new EnumToNumberConverter<BookingStatus, short>()).HasColumnName("status");
            builder.Property(b => b.IsMadeManually).HasColumnName("is_made_manually");
            builder.Property("requestedDate").HasColumnName("requested_date");
            builder.Property("bookedDate").HasColumnName("booked_date");

            builder.OwnsMany<BookedRecord>(b => b.BookedRecords, x =>
            {
                x.WithOwner().HasForeignKey("booking_id");
                x.ToTable("booked_records", SchemaNames.Booking);

                x.HasKey("Id");
                x.Property("Id").HasColumnName("booked_record_id");

                x.OwnsOne<EmployeeId>(b => b.EmployeeId, e =>
                    e.Property(p => p.Value).HasColumnName("employee_id"));
                x.OwnsOne<OfferId>(b => b.OfferId, e =>
                    e.Property(p => p.Value).HasColumnName("offer_id"));
                
                x.OwnsOne<Money>(b => b.Price, m =>
                {
                    m.Property(p => p.Value).HasColumnName("price");
                    m.Property(p => p.Currency).HasColumnName("currency");
                });

                x.Property(b => b.Date).HasColumnName("date");
                x.Property(b => b.DurationInMinutes).HasColumnName("duration");
                x.Property("Status").HasConversion(new EnumToNumberConverter<BookedRecordStatus, short>()).HasColumnName("status");
                x.Property(b => b.Caution).HasColumnName("caution");
                x.Property("changeDate").HasColumnName("change_date");
            });
        }
    }
}
