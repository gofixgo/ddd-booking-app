﻿// <auto-generated />
using System;
using Accessibility.Infrastructure.Database;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace Accessibility.Infrastructure.Database.Migrations
{
    [DbContext(typeof(AccessibilityContext))]
    partial class AccessibilityContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 63)
                .HasAnnotation("ProductVersion", "5.0.3")
                .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            modelBuilder.Entity("Accessibility.Application.Facilities.Offer", b =>
                {
                    b.Property<Guid>("Id")
                        .HasColumnType("uuid")
                        .HasColumnName("offer_id");

                    b.Property<string>("Currency")
                        .HasColumnType("text")
                        .HasColumnName("currency");

                    b.Property<short>("Duration")
                        .HasColumnType("smallint")
                        .HasColumnName("duration");

                    b.Property<Guid?>("FacilityId")
                        .HasColumnType("uuid")
                        .HasColumnName("facility_id");

                    b.Property<string>("Name")
                        .HasColumnType("text")
                        .HasColumnName("name");

                    b.Property<decimal>("Price")
                        .HasColumnType("numeric")
                        .HasColumnName("price");

                    b.Property<int>("Status")
                        .HasColumnType("integer")
                        .HasColumnName("status");

                    b.HasKey("Id");

                    b.ToTable("offers", "facility");
                });

            modelBuilder.Entity("Accessibility.Domain.Bookings.Booking", b =>
                {
                    b.Property<Guid>("Id")
                        .HasColumnType("uuid")
                        .HasColumnName("booking_id");

                    b.Property<Guid?>("FacilityId")
                        .HasColumnType("uuid")
                        .HasColumnName("facility_id");

                    b.Property<DateTime>("bookedDate")
                        .HasColumnType("timestamp without time zone")
                        .HasColumnName("booked_date");

                    b.Property<Guid?>("customerId")
                        .HasColumnType("uuid")
                        .HasColumnName("customer_id");

                    b.Property<DateTime>("requestedDate")
                        .HasColumnType("timestamp without time zone")
                        .HasColumnName("requested_date");

                    b.Property<short>("status")
                        .HasColumnType("smallint");

                    b.HasKey("Id");

                    b.ToTable("bookings", "booking");
                });

            modelBuilder.Entity("Accessibility.Domain.Schedules.Schedule", b =>
                {
                    b.Property<Guid>("Id")
                        .HasColumnType("uuid")
                        .HasColumnName("schedule_id");

                    b.Property<Guid?>("FacilityId")
                        .HasColumnType("uuid")
                        .HasColumnName("facility_id");

                    b.Property<DateTime>("creationDate")
                        .HasColumnType("timestamp without time zone")
                        .HasColumnName("creation_date");

                    b.Property<Guid?>("creatorId")
                        .HasColumnType("uuid")
                        .HasColumnName("creator_id");

                    b.Property<DateTime>("endDate")
                        .HasColumnType("timestamp without time zone")
                        .HasColumnName("end_date");

                    b.Property<DateTime?>("modifyDate")
                        .HasColumnType("timestamp without time zone")
                        .HasColumnName("modify_date");

                    b.Property<string>("name")
                        .HasColumnType("text");

                    b.Property<DateTime>("startDate")
                        .HasColumnType("timestamp without time zone")
                        .HasColumnName("start_date");

                    b.Property<int>("version")
                        .IsConcurrencyToken()
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.ToTable("schedules", "accessibility");
                });

            modelBuilder.Entity("Accessibility.Infrastructure.Processing.Outbox.OutboxNotification", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid")
                        .HasColumnName("id");

                    b.Property<string>("Data")
                        .HasColumnType("text")
                        .HasColumnName("data");

                    b.Property<DateTime>("OccuredDate")
                        .HasColumnType("timestamp without time zone")
                        .HasColumnName("occured_date");

                    b.Property<DateTime?>("ProcessedDate")
                        .HasColumnType("timestamp without time zone")
                        .HasColumnName("processed_date");

                    b.Property<string>("Type")
                        .HasColumnType("text")
                        .HasColumnName("type");

                    b.HasKey("Id");

                    b.ToTable("outbox_notifications", "app");
                });

            modelBuilder.Entity("Accessibility.Domain.Bookings.Booking", b =>
                {
                    b.OwnsMany("Accessibility.Domain.Bookings.BookedRecords.BookedRecord", "bookedRecords", b1 =>
                        {
                            b1.Property<Guid>("Id")
                                .HasColumnType("uuid")
                                .HasColumnName("booked_record_id");

                            b1.Property<Guid>("booking_id")
                                .HasColumnType("uuid");

                            b1.Property<DateTime?>("changeDate")
                                .HasColumnType("timestamp without time zone")
                                .HasColumnName("change_date");

                            b1.Property<DateTime>("date")
                                .HasColumnType("timestamp without time zone");

                            b1.Property<short>("durationInMinutes")
                                .HasColumnType("smallint")
                                .HasColumnName("duration");

                            b1.Property<short>("status")
                                .HasColumnType("smallint");

                            b1.HasKey("Id");

                            b1.HasIndex("booking_id");

                            b1.ToTable("booked_records", "booking");

                            b1.WithOwner()
                                .HasForeignKey("booking_id");

                            b1.OwnsOne("Accessibility.Domain.SharedKernel.EmployeeId", "employeeId", b2 =>
                                {
                                    b2.Property<Guid>("BookedRecordId")
                                        .HasColumnType("uuid");

                                    b2.Property<Guid>("Value")
                                        .HasColumnType("uuid")
                                        .HasColumnName("employee_id");

                                    b2.HasKey("BookedRecordId");

                                    b2.ToTable("booked_records");

                                    b2.WithOwner()
                                        .HasForeignKey("BookedRecordId");
                                });

                            b1.OwnsOne("Accessibility.Domain.SharedKernel.Money", "price", b2 =>
                                {
                                    b2.Property<Guid>("BookedRecordId")
                                        .HasColumnType("uuid");

                                    b2.Property<string>("Currency")
                                        .HasColumnType("text")
                                        .HasColumnName("currency");

                                    b2.Property<decimal>("Value")
                                        .HasColumnType("numeric")
                                        .HasColumnName("price");

                                    b2.HasKey("BookedRecordId");

                                    b2.ToTable("booked_records");

                                    b2.WithOwner()
                                        .HasForeignKey("BookedRecordId");
                                });

                            b1.OwnsOne("Accessibility.Domain.SharedKernel.OfferId", "offerId", b2 =>
                                {
                                    b2.Property<Guid>("BookedRecordId")
                                        .HasColumnType("uuid");

                                    b2.Property<Guid>("Value")
                                        .HasColumnType("uuid")
                                        .HasColumnName("offer_id");

                                    b2.HasKey("BookedRecordId");

                                    b2.ToTable("booked_records");

                                    b2.WithOwner()
                                        .HasForeignKey("BookedRecordId");
                                });

                            b1.Navigation("employeeId");

                            b1.Navigation("offerId");

                            b1.Navigation("price");
                        });

                    b.Navigation("bookedRecords");
                });

            modelBuilder.Entity("Accessibility.Domain.Schedules.Schedule", b =>
                {
                    b.OwnsMany("Accessibility.Domain.Schedules.Availabilities.Availability", "availabilities", b1 =>
                        {
                            b1.Property<Guid>("Id")
                                .HasColumnType("uuid")
                                .HasColumnName("availability_id");

                            b1.Property<DateTime>("EndTime")
                                .HasColumnType("timestamp without time zone")
                                .HasColumnName("end_time");

                            b1.Property<short>("Priority")
                                .HasColumnType("smallint")
                                .HasColumnName("priority");

                            b1.Property<DateTime>("StartTime")
                                .HasColumnType("timestamp without time zone")
                                .HasColumnName("start_time");

                            b1.Property<DateTime>("creationDate")
                                .HasColumnType("timestamp without time zone")
                                .HasColumnName("creation_date");

                            b1.Property<Guid?>("creatorId")
                                .HasColumnType("uuid")
                                .HasColumnName("creator_id");

                            b1.Property<Guid?>("employeeId")
                                .HasColumnType("uuid")
                                .HasColumnName("employee_id");

                            b1.Property<Guid>("schedule_id")
                                .HasColumnType("uuid");

                            b1.HasKey("Id");

                            b1.HasIndex("schedule_id");

                            b1.ToTable("availabilities", "accessibility");

                            b1.WithOwner()
                                .HasForeignKey("schedule_id");
                        });

                    b.Navigation("availabilities");
                });
#pragma warning restore 612, 618
        }
    }
}
