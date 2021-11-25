import PaymentEnum from "../../../enums/Payment";

export default abstract class Payment {
    abstract slug: PaymentEnum
    abstract label: string
}