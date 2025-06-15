import { Module } from "@nestjs/common";
import { PaymentService } from "./payment.service";
import { PaymentController } from "./payment.controller";
import { NotificationClient } from "../notification";
import { UserClient } from "../user";
import { PaymentClient } from "./payment.client";

@Module({
    providers: [PaymentClient, UserClient, NotificationClient, PaymentService],
    controllers: [PaymentController],
    exports: [PaymentService],
})
export class PaymentModule {}
