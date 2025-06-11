import { Injectable } from "@nestjs/common";
import { ClientProxy, ClientProxyFactory, Transport } from "@nestjs/microservices";
import { CreateOrderDto, UpdateOrderDto } from "./dtos";

@Injectable()
export class OrderClient {
    client: ClientProxy;

    constructor() {
        this.client = ClientProxyFactory.create({
            transport: Transport.TCP,
            options: {
                host: 'localhost',
                port: 3004,
            }
        })
    };

    async onModuleInit() {
        await this.client.connect();
    };

    createOrder(data: CreateOrderDto) {
        return this.client.send('create-order',data);
    };

    updateOrder(data: {id: number, payload: UpdateOrderDto}) {
        return this.client.send('update-order',data);
    };

    getOrders() {
        return this.client.send('get-all-orders',"");
    };

    getOrderById(data: {id: number}) {
        return this.client.send('get-order-by-id',data);
    };

    deleteOrder(data: {id: number}) {
        return this.client.send('delete-order',data);
    }
}