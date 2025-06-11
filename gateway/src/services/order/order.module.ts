import { Module } from "@nestjs/common";
import { OrderClient } from "./order.client";
import { OrderService } from "./order.service";
import { OrderController } from "./order.controller";

@Module({
    controllers: [OrderController],
    providers: [OrderClient,OrderService],
})
export class OrderModule {}