const PaymentEnum = Object.freeze({
    ONLINE       : { slug: "online", label: 'Онлайн на сайте' },
    COURIER_CARD : { slug: "courier-card", label: 'Картой курьеру' },
    COURIER_CASH : { slug: "courier-cash", label: 'Наличными курьеру' },
    IN_PLACE     : { slug: "in-place", label: 'В ресторане' }
});

export default PaymentEnum;