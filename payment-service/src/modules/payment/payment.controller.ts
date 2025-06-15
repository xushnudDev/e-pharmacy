import { Controller } from "@nestjs/common";
import { PaymentService } from "./payment.service";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { CreatePaymentDto } from "./dtos";

@Controller()
export class PaymentListener {
    constructor(private readonly paymentService: PaymentService) {}

    @MessagePattern("create-payment")
    async cretePayment(@Payload() data: CreatePaymentDto) {
        return this.paymentService.createPayment(data);
    }
}