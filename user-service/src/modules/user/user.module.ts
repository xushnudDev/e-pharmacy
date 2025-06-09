import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./models";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { AuthService } from "./auth.service";

@Module({
    imports: [
        MongooseModule.forFeature([
            {name: User.name, schema: UserSchema}
        ])
    ],
    controllers: [UserController],
    providers: [UserService,AuthService],
})

export class UserModule {}