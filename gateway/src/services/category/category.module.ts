import { Module } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { CategoryClient } from "./category.client";
import { CategoryController } from "./category.controller";

@Module({
    controllers: [CategoryController],
    providers: [CategoryService,CategoryClient],
})
export class CategoryModule {}