using System.Text;
using System.Text.Json;
using Booking.Application.Bookings.Book.EventBus;
using Booking.Domain.SharedKernel;
using Microsoft.Extensions.ObjectPool;
using RabbitMQ.Client;

namespace Booking.Infrastructure.Domain.Bookings
{
    public class BookRabbitEventBus : IBookEventBus
    {
        private const string exchange = "booking_orders";
        private readonly ObjectPool<IModel> rabbitPool;

        public BookRabbitEventBus(ObjectPool<IModel> rabbitPool)
        {
            this.rabbitPool = rabbitPool;
        }

        public void Publish(BookingOrderMessage message, FacilityId facilityId)
        {
            var channel = rabbitPool.Get();

            try
            {
                channel.ExchangeDeclare(
                    exchange: exchange,
                    type: "direct",
                    durable: true,
                    autoDelete: false,
                    arguments: null);

                var body = Encoding.UTF8.GetBytes(JsonSerializer.Serialize(message));

                channel.BasicPublish(
                    exchange: exchange,
                    routingKey: facilityId.Value.ToString(),
                    basicProperties: null,
                    body: body
                );
            }
            finally
            {
                rabbitPool.Return(channel);
            }
        }
    }
}
