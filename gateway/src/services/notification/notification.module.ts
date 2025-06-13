import { Module } from "@nestjs/common";
import { NotificationController } from "./notification.controller";
import { NotificationClient } from "./notification.client";
import { NotificationService } from "./notification.service";

@Module({
    controllers: [NotificationController],
    providers: [NotificationClient,NotificationService],
})
export class NotificationModule {}