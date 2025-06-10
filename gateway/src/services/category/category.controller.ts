import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { CreateCategoryDto, UpdateCategoryDto } from "./dtos";

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
    async getOne(@Param("id",ParseIntPipe) id: number) {
        return await this.categoryService.getOne({id});
    };

    @Get('with-pills/all')
    async getPillsByCategory() {
        return await this.categoryService.getPillsByCategory();
    }

    @Put(':id')
    async updateCategory(@Param("id",ParseIntPipe) id: number, @Body() payload: UpdateCategoryDto) {
        return await this.categoryService.updateCategory({id, payload});
    };

    @Delete(':id')
    async deleteCategory(@Param("id") id: number) {
        return await this.categoryService.deleteCategory({id});
    }
}