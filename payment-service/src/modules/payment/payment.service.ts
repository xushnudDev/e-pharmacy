import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma";
import { CreatePaymentDto } from "./dtos";

@Injectable()
export class PaymentService {
    constructor(private prismaService: PrismaService) {}

    async createPayment(payload: CreatePaymentDto) {
        const payment = await this.prismaService.payment.create({
            data: {
                userId: payload.userId,
                orderId: payload.orderId,
                amount: payload.amount,
                message: payload.message,
                type: payload.type,
                email: payload.email,
                status: payload.status,
            }
        });

        return {
            message: "Payment created successfully",
            data: payment
        }
    }
}