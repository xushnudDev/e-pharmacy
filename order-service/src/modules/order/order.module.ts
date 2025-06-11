import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Order } from "./model";
import { OrderController } from "./order.controller";
import { OrderService } from "./order.service";

@Module({
    imports: [SequelizeModule.forFeature([Order])],
    controllers: [OrderController],
    providers: [OrderService],
})
export class OrderModule {}