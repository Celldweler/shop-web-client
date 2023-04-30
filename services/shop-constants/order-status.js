export const ORDER_STATUS = {
    Pending: 0, //Новый заказ
    AwaitingPayment: 1,       // ожыдание оплаты
    AwaitingFulFillment: 2, // ожыдание выполнения комплектуется
    AwaitingShipment: 3, // комплектуется перевозчиком ожыдается к отправке
    Shipped: 4,            // отправлен следует к получателю
    Delivered: 5, // Доставлен
    AwaitingPickup: 6, // прибыл к получателю в ожыдании получателя на почте
    Completed: 7,      // за
}