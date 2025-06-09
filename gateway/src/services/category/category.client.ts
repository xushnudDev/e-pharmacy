import { Injectable } from "@nestjs/common";
import { ClientProxy, ClientProxyFactory, Transport } from "@nestjs/microservices";
import { CreateCategoryDto, UpdateCategoryDto } from "./dtos";

@Injectable()
export class CategoryClient {
    client: ClientProxy;

    constructor() {
        this.client = ClientProxyFactory.create({
            transport: Transport.TCP,
            options: {
                host: 'localhost',
                port: 3002,
            }
        })
    };

    async onModuleInit() {
        await this.client.connect();
    };

    createCategory(data: CreateCategoryDto) {
        return this.client.send('create_category',data);
    };

    getCategories() {
        return this.client.send('get_all_categories',"");
    };

    getCategoryById(data: {id: number}) {
        return this.client.send('get_category_by_id',data);
    };

    updateCategory(data: {id: number, payload: UpdateCategoryDto}) {
        return this.client.send('update_category',data);
    };

    deleteCategory(data: {id: number}) {
        return this.client.send('delete_category',data);
    };
}