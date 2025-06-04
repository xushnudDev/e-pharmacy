import { Controller } from "@nestjs/common";
import { UserService } from "./user.service";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { CreateUserDto } from "./dtos";

@Controller()
export class UserController {
    constructor(private readonly userService: UserService) {}

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

    @MessagePattern('update_user')
    async updateUser(@Payload() data: {id: string, payload: CreateUserDto}) {
        return this.userService.update(data.id, data.payload);
    };

    @MessagePattern('delete_user')
    async deleteUser(@Payload() data: {id: string}) {
        return this.userService.delete(data.id);
    }
}