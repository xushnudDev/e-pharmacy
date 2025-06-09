import { Injectable } from "@nestjs/common";
import { CategoryClient } from "./category.client";
import { CreateCategoryDto, UpdateCategoryDto } from "./dtos";

@Injectable()
export  class CategoryService {
    constructor(private categoryClient: CategoryClient) {}

    async createCategory(data: CreateCategoryDto) {
        return await this.categoryClient.createCategory(data);
    };

    async getAll() {
        return await this.categoryClient.getCategories();
    };

    async getOne(data: {id: number}) {
        return await this.categoryClient.getCategoryById(data);
    };

    async updateCategory(data: {id: number, payload: UpdateCategoryDto}) {
        return await this.categoryClient.updateCategory(data);
    };

    async deleteCategory(data: {id: number}) {
        return await this.categoryClient.deleteCategory(data);
    }
}