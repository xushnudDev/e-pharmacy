import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto, UpdateUserDto } from "./dtos";

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    getAll() {
        return this.userService.findAllUsers();
    };

    @Get(':id')
    getById(@Param("id") id: string) {
        return this.userService.findUserById({id});
    };

    @Get("with-pills/all")
    getAllWithPills() {
        return this.userService.getPillsByUser();
    }

    @Post()
    createUser(@Body() payload: CreateUserDto) {
        return this.userService.createUser(payload);
    };

    @Put(':id')
    updateUser(@Param("id") id: string, @Body() payload: UpdateUserDto) {
        return this.userService.updateUser({id, payload});
    };

    @Delete(':id')
    deleteUser(@Param("id") id: string) {
        return this.userService.deleteUser({id});
    }
}