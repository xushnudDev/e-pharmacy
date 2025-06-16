import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { OrderService } from "./order.service";
import { CreateOrderDto, UpdateOrderDto } from "./dtos";
import { Protected, Roles } from "src/decorator";
import { UserRoles } from "../enum";

@Controller('order')
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    @Get()
    @Protected(true)
    @Roles([UserRoles.ADMIN])
    async getAll() {
        return this.orderService.getAll();
    };

    @Get(':id')
    @Protected(true)
    @Roles([UserRoles.ADMIN])
    async getOne(@Param('id', ParseIntPipe) id: number) {
        return this.orderService.getOne({id});
    };

    @Post()
    @Protected(true)
    @Roles([UserRoles.ADMIN])
    async create(@Body() payload: CreateOrderDto) {
        return this.orderService.create(payload);
    };

    @Put(':id')
    @Protected(true)
    @Roles([UserRoles.ADMIN])
    async update(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdateOrderDto) {
        return this.orderService.update({id, payload});
    };

    @Delete(':id')
    @Protected(true)
    @Roles([UserRoles.ADMIN])
    async delete(@Param('id', ParseIntPipe) id: number) {
        return this.orderService.delete({id});
    }

}