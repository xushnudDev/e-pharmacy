import { Injectable, Logger } from "@nestjs/common";
import { NotificationClient } from "./notification.client";
import { CreateNotificationDto } from "./dtos";

@Injectable()
export class NotificationService {
    private readonly logger = new Logger(NotificationService.name);

    constructor(private readonly client: NotificationClient) {}

    async sendEmailToUser(payload: CreateNotificationDto) {
        this.logger.log(`Sending notification to ${payload.userId}`);
        return await this.client.sendNotification(payload);
    }
}
