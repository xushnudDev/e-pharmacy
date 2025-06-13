import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Notification } from "./model";
import { CreateNotificationDto } from "./dtos";
import * as nodemailer from "nodemailer";

@Injectable()
export class NotificationService {
    constructor(@InjectModel(Notification) private notificationModel: typeof Notification) {}

    async sendNotification(dto: CreateNotificationDto) {
        try {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'tursunboyevx43@gmail.com',
                    pass: 'aiye kkge dxai zmnm'
                }
            });

            await transporter.sendMail({
                from: 'tursunboyevx43@gmail.com',
                to: dto.email,
                subject: 'Notification',
                text: dto.message
            });

            const notification = await this.notificationModel.create({
                ...dto,
                status: 'sent',
            });

            return {
                message: 'Notification sent successfully',
                data: notification
            }
        } catch (error) {
            await this.notificationModel.create({
                ...dto,
                status: 'failed',
            });
        }
    }
}