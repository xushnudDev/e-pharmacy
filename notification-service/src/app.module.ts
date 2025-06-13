import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { NotificationModule } from './modules';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1982',
      database: 'notification_service',
      sync: {
        alter: true,
      },
      autoLoadModels: true,
    }),
    NotificationModule,
  ],
})
export class AppModule {}
