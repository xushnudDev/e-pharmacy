import { Injectable } from "@nestjs/common";
import { CategoryClient } from "./category.client";
import { CreateCategoryDto, UpdateCategoryDto } from "./dtos";
import { lastValueFrom } from "rxjs";
import { PillClient } from "../pill";

@Injectable()
export  class CategoryService {
    constructor(private categoryClient: CategoryClient,private readonly pillClient: PillClient) {}

    async createCategory(data: CreateCategoryDto) {
        return await this.categoryClient.createCategory(data);
    };

    async getAll() {
        return await this.categoryClient.getCategories();
    };

    async getOne(data: {id: number}) {
        return await this.categoryClient.getCategoryById(data);
    };

    async getPillsByCategory() {
    const categories = await lastValueFrom(this.categoryClient.getCategories());
    
    const result = await Promise.all(categories.data.map(async (c) => {
        const pills = await lastValueFrom(this.pillClient.getPillsByCategory(c.id));
        return {
            ...c,
            pills: pills.data,
        };
    }));

    return { data: result };
}


    async updateCategory(data: {id: number, payload: UpdateCategoryDto}) {
        return await this.categoryClient.updateCategory(data);
    };

    async deleteCategory(data: {id: number}) {
        return await this.categoryClient.deleteCategory(data);
    }
}