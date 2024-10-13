using API.Models.Entity;

namespace API.Service.Interface
{
    public interface IVNPayService
    {
        public string GetUrlPayment(int typePayment, Order order);
    }
}
