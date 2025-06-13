import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Notification } from "./model";
import { NotificationListener } from "./notification.controller";
import { NotificationService } from "./notification.service";

@Module({
    imports: [SequelizeModule.forFeature([Notification])],
    controllers: [NotificationListener],
    providers: [NotificationService],
})
export class NotificationModule {}