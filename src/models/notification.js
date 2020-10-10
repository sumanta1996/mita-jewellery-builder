class Notification {
    constructor(body, title, orderId, orderTime, read, newNot) {
        this.body = body;
        this.title = title;
        this.orderId = orderId;
        this.orderTime = orderTime;
        this.read = read;
        this.newNot = newNot;
    }
}

export default Notification;