import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { CreateCategoryDto } from "./dtos";

@Controller('category')
export class CategoryController {
    constructor(private categoryService: CategoryService) {}

    @Post()
    async createCategory(@Body() payload: CreateCategoryDto) {
        return await this.categoryService.createCategory(payload);
    };

    @Get()
    async getAll() {
        return await this.categoryService.getAll();
    };

    @Get(':id')
    async getOne(@Param("id") id: number) {
        return await this.categoryService.getOne({id});
    };

    @Put(':id')
    async updateCategory(@Param("id") id: number, @Body() payload: CreateCategoryDto) {
        return await this.categoryService.updateCategory({id, payload});
    };

    @Delete(':id')
    async deleteCategory(@Param("id") id: number) {
        return await this.categoryService.deleteCategory({id});
    }
}