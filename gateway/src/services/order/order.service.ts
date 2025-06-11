import { Injectable } from "@nestjs/common";
import { OrderClient } from "./order.client";
import { CreateOrderDto } from "./dtos";

@Injectable()
export class OrderService {
    constructor(private readonly orderClient: OrderClient) {}

    async create(data: CreateOrderDto) {
        return await this.orderClient.createOrder(data);
    };

    async getAll() {
        return await this.orderClient.getOrders();
    };

    async getOne(data: {id: number}) {
        return await this.orderClient.getOrderById(data);
    };

    async update(data: {id: number, payload: CreateOrderDto}) {
        return await this.orderClient.updateOrder(data);
    };

    async delete(data: {id: number}) {
        return await this.orderClient.deleteOrder(data);
    }
}