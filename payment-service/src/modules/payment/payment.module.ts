import { Module } from "@nestjs/common";
import { PaymentListener } from "./payment.controller";
import { PaymentService } from "./payment.service";
import { PrismaService } from "src/prisma";

@Module({
    controllers: [PaymentListener],
    providers: [PaymentService,PrismaService],
})
export class PaymentModule {}