import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { CreateCategoryDto, UpdateCategoryDto } from "./dtos";
import { Protected, Roles } from "src/decorator";
import { UserRoles } from "../enum";
import { ApiBearerAuth } from "@nestjs/swagger";

@Controller('category')
export class CategoryController {
    constructor(private categoryService: CategoryService) {}

    @ApiBearerAuth()
    @Post()
    @Protected(true)
    @Roles([UserRoles.ADMIN])
    async createCategory(@Body() payload: CreateCategoryDto) {
        return await this.categoryService.createCategory(payload);
    };

    @ApiBearerAuth()
    @Get()
    @Protected(true)
    @Roles([UserRoles.ADMIN])
    async getAll() {
        return await this.categoryService.getAll();
    };

    @ApiBearerAuth()
    @Get(':id')
    @Protected(true)
    @Roles([UserRoles.ADMIN])
    async getOne(@Param("id",ParseIntPipe) id: number) {
        return await this.categoryService.getOne({id});
    };

    @Get('with-pills/all')
    @Protected(false)
    @Roles([UserRoles.CUSTOMER,UserRoles.ADMIN])
    async getPillsByCategory() {
        return await this.categoryService.getPillsByCategory();
    }

    @ApiBearerAuth()
    @Put(':id')
    @Protected(true)
    @Roles([UserRoles.ADMIN])
    async updateCategory(@Param("id",ParseIntPipe) id: number, @Body() payload: UpdateCategoryDto) {
        return await this.categoryService.updateCategory({id, payload});
    };

    @ApiBearerAuth()
    @Delete(':id')
    @Protected(true)
    @Roles([UserRoles.ADMIN])
    async deleteCategory(@Param("id") id: number) {
        return await this.categoryService.deleteCategory({id});
    }
}