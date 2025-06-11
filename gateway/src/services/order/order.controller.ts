import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { OrderService } from "./order.service";
import { CreateOrderDto, UpdateOrderDto } from "./dtos";

@Controller('order')
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    @Get()
    async getAll() {
        return this.orderService.getAll();
    };

    @Get(':id')
    async getOne(@Param('id', ParseIntPipe) id: number) {
        return this.orderService.getOne({id});
    };

    @Post()
    async create(@Body() payload: CreateOrderDto) {
        return this.orderService.create(payload);
    };

    @Put(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdateOrderDto) {
        return this.orderService.update({id, payload});
    };

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return this.orderService.delete({id});
    }

}