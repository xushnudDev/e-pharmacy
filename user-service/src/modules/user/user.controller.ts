import { Controller } from "@nestjs/common";
import { UserService } from "./user.service";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { CreateUserDto } from "./dtos";
import { RegisterUserDto } from "./dtos/register-user.dto";
import { AuthService } from "./auth.service";
import { LoginUserDto } from "./dtos/login-user.dto";

@Controller()
export class UserController {
    constructor(private readonly userService: UserService,private readonly authService: AuthService) {}

    @MessagePattern('get_all_users')
    async getAllUsers() {
        return this.userService.findAll();
    };

    @MessagePattern('get_user_by_id')
    async getUserById(@Payload() data: {id: string}) {
        return this.userService.findOneById(data.id);
    };

    @MessagePattern('create_user')
    async createUser(@Payload() data: CreateUserDto) {
        return this.userService.create(data);
    };

    @MessagePattern('decrease_user_balance')
    async decreaseUserBalance(@Payload() data: {id: string, amount: number}) {
        return this.userService.decreaseBalance(data.id, data.amount);
    }


    @MessagePattern('register_user')
    async registerUser(@Payload() data: RegisterUserDto) {
        return this.authService.register(data);
    };

    @MessagePattern('login_user')
    async loginUser(@Payload() data: LoginUserDto) {
        return this.authService.login(data);
    }

    @MessagePattern('update_user')
    async updateUser(@Payload() data: {id: string, payload: CreateUserDto}) {
        return this.userService.update(data.id, data.payload);
    };

    @MessagePattern('delete_user')
    async deleteUser(@Payload() data: {id: string}) {
        return this.userService.delete(data.id);
    }
}