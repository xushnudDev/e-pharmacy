import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { PillService } from "./pill.service";
import { CreatePillDto, UpdatePillDto } from "./dtos";

@Controller('pills')
export class PillController {
    constructor(private readonly pillService: PillService) {}

    @Get()
    async getAll() {
        return await this.pillService.findAll();
    };

    @Get(':id')
    async getById(@Param("id") id: number) {
        return await this.pillService.findOne({id});
    };
    
    @Post()
    async createPill(@Body() payload: CreatePillDto) {
        return await this.pillService.create(payload);
    };

    @Put(':id')
    async updatePill(@Param('id') id: number, @Body() payload: UpdatePillDto) {
        return await this.pillService.update({id, payload});
    };

    @Delete(':id')
    async deletePill(@Param('id') id: number) {
        return await this.pillService.delete({id});
    }
}