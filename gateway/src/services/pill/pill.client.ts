import { Injectable, OnModuleInit } from "@nestjs/common";
import { ClientProxy, ClientProxyFactory, Transport } from "@nestjs/microservices";
import { CreatePillDto, SearchPillDto, UpdatePillDto } from "./dtos";

@Injectable()
export class PillClient {
    client: ClientProxy;

    constructor() {
        this.client = ClientProxyFactory.create({
            transport: Transport.TCP,
            options: {
                host: 'localhost',
                port: 3003
            }
        })
    };

    async onModuleInit() {
        await this.client.connect();
    };

    createPill(data: CreatePillDto) {
        return this.client.send("create_pill", data);
    };

    getAll() {
        return this.client.send("get_all_pills","");
    };

    getOneById(data: {id: number}) {
        return this.client.send("get_pill_by_id", data);
    };

    getPillsByCategory(categoryId: number) {
        return this.client.send("get_pills_by_category", {categoryId});
    };

    getPillsByUser(userId: string) {
        return this.client.send("get_pills_by_user", {userId});
    }

    updatePill(data: {id: number, payload: UpdatePillDto}) {
        return this.client.send("update_pill", data);
    };

    deletePill(data: {id: number}) {
        return this.client.send("delete_pill", data);
    };

    search(data: SearchPillDto) {
        return this.client.send("search_pills", data);
    }
}