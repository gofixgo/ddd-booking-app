using Accessibility.Domain.Bookings;
using Accessibility.Infrastructure.Utils.Outbox;
using Microsoft.EntityFrameworkCore;

namespace Accessibility.Infrastructure.Database
{
    public class AccessibilityContext : DbContext
    {
        public AccessibilityContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Booking> Bookings { get; set; }
        public DbSet<OutboxNotification> OutboxNotifications { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(AccessibilityContext).Assembly);
        }
    }
}
