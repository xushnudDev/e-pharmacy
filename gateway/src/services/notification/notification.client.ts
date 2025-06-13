import { Injectable } from "@nestjs/common";
import { ClientProxy, ClientProxyFactory, Transport } from "@nestjs/microservices";
import { CreateNotificationDto } from "./dtos";

@Injectable()
export class NotificationClient {
    client: ClientProxy;
    constructor() {
        this.client = ClientProxyFactory.create({
            transport: Transport.RMQ,
            options: {
                urls: ['amqp://localhost:5672'],
                queue: 'notification_queue',
                queueOptions: {
                    durable: false
                }
            }
        })
    };

    async onModuleInit() {
        await this.client.connect();
    };

    async sendNotification(data: CreateNotificationDto) {
        return this.client.emit('send-notification', data);
    }
}