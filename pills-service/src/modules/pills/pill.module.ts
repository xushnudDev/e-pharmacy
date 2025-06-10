import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Pill } from "./model";
import { PillService } from "./pill.service";
import { PillController } from "./pill.controller";

@Module({
    imports: [SequelizeModule.forFeature([Pill])],
    providers: [PillService],
    controllers: [PillController],
})

export class PillModule {}