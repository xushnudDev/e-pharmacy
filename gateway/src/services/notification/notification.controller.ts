import { Body, Controller, Post } from "@nestjs/common";
import { NotificationService } from "./notification.service";
import { CreateNotificationDto } from "./dtos";

@Controller('notification')
export class NotificationController {
    constructor(private readonly notificationService: NotificationService) {}

    @Post()
    async sendNotification(@Body() data: CreateNotificationDto) {
        return await this.notificationService.sendEmailToUser(data)
    }
}