import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto, LoginUserDto, RegisterUserDto, UpdateUserDto } from "./dtos";
import { Protected, Roles } from "src/decorator";
import { UserRoles } from "../enum";

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    @Protected(true)
    @Roles([UserRoles.ADMIN])
    getAll() {
        return this.userService.findAllUsers();
    };

    @Get(':id')
    @Protected(true)
    @Roles([UserRoles.ADMIN])
    getById(@Param("id") id: string) {
        return this.userService.findUserById({id});
    };

    @Get("with-pills/all")
    @Protected(false)
    @Roles([UserRoles.ADMIN,UserRoles.CUSTOMER])
    getAllWithPills() {
        return this.userService.getPillsByUser();
    }

    @Post()
    @Protected(true)
    @Roles([UserRoles.ADMIN])
    createUser(@Body() payload: CreateUserDto) {
        return this.userService.createUser(payload);
    };

    @Post('register')
    @Protected(false)
    @Roles([UserRoles.ADMIN,UserRoles.CUSTOMER])
    registerUser(@Body() payload: RegisterUserDto) {
        return this.userService.register(payload);
    };

    @Post('login')
    @Protected(false)
    @Roles([UserRoles.ADMIN,UserRoles.CUSTOMER])
    loginUser(@Body() payload: LoginUserDto) {
        return this.userService.login(payload);
    }

    @Put(':id')
    @Protected(true)
    @Roles([UserRoles.ADMIN])
    updateUser(@Param("id") id: string, @Body() payload: UpdateUserDto) {
        return this.userService.updateUser({id, payload});
    };

    @Delete(':id')
    @Protected(true)
    @Roles([UserRoles.ADMIN])
    deleteUser(@Param("id") id: string) {
        return this.userService.deleteUser({id});
    }
}