import { Module } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { CategoryClient } from "./category.client";
import { CategoryController } from "./category.controller";
import { PillClient } from "../pill";

@Module({
    controllers: [CategoryController],
    providers: [CategoryService,CategoryClient,PillClient],
})
export class CategoryModule {}