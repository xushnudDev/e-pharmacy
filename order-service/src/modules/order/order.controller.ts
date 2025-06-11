import { Controller } from "@nestjs/common";
import { OrderService } from "./order.service";
import { CreateOrderDto, UpdateOrderDto } from "./dtos";
import { MessagePattern } from "@nestjs/microservices";

@Controller()
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    @MessagePattern('create-order')
    async create(data: CreateOrderDto) {
        return await this.orderService.createOrder(data);
    };

    @MessagePattern('get-all-orders')
    async getAll() {
        return await this.orderService.getAll();
    };

    @MessagePattern('get-order-by-id')
    async getById(data: {id: number}) {
        return await this.orderService.getById(data.id);
    };

    @MessagePattern('update-order')
    async update(data: {id: number, updateOrderDto: UpdateOrderDto}) {
        return await this.orderService.update(data.id, data.updateOrderDto);
    };

    @MessagePattern('delete-order')
    async delete(data: {id: number}) {
        return await this.orderService.delete(data.id);
    }
}