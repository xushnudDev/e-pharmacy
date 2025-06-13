import { Controller } from "@nestjs/common";
import { NotificationService } from "./notification.service";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { CreateNotificationDto } from "./dtos";

@Controller()
export class NotificationListener {
    constructor(private readonly notificationService: NotificationService) {}

    @MessagePattern("send-notification")
    async sendNotification(@Payload() data: CreateNotificationDto) {
        return await this.notificationService.sendNotification(data);
    }
}