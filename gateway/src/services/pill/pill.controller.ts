import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { PillService } from "./pill.service";
import { CreatePillDto, UpdatePillDto } from "./dtos";
import { Protected, Roles } from "src/decorator";
import { UserRoles } from "../enum";

@Controller('pills')
export class PillController {
    constructor(private readonly pillService: PillService) {}

    @Get()
    @Protected(true)
    @Roles([UserRoles.ADMIN])
    async getAll() {
        return await this.pillService.findAll();
    };

    @Get(':id')
    @Protected(true)
    @Roles([UserRoles.ADMIN])
    async getById(@Param("id") id: number) {
        return await this.pillService.findOne({id});
    };
    
    @Post()
    @Protected(true)
    @Roles([UserRoles.ADMIN])
    async createPill(@Body() payload: CreatePillDto) {
        return await this.pillService.create(payload);
    };

    @Put(':id')
    @Protected(true)
    @Roles([UserRoles.ADMIN])
    async updatePill(@Param('id') id: number, @Body() payload: UpdatePillDto) {
        return await this.pillService.update({id, payload});
    };

    @Delete(':id')
    @Protected(true)
    @Roles([UserRoles.ADMIN])
    async deletePill(@Param('id') id: number) {
        return await this.pillService.delete({id});
    }
}