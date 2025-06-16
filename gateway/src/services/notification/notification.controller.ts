import { Body, Controller, Post } from "@nestjs/common";
import { NotificationService } from "./notification.service";
import { CreateNotificationDto } from "./dtos";
import { Protected, Roles } from "src/decorator";
import { UserRoles } from "../enum";

@Controller('notification')
export class NotificationController {
    constructor(private readonly notificationService: NotificationService) {}

    @Post()
    @Protected(true)
    @Roles([UserRoles.ADMIN])
    async sendNotification(@Body() data: CreateNotificationDto) {
        return await this.notificationService.sendEmailToUser(data)
    }
}