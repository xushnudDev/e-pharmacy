import { Injectable } from "@nestjs/common";
import { PillClient } from "./pill.client";
import { CreatePillDto, UpdatePillDto } from "./dtos";

@Injectable()
export class PillService {
    constructor(private readonly pillClient: PillClient) {}

    async create(data: CreatePillDto) {
        return await this.pillClient.createPill(data);
    };

    async findAll() {
        return await this.pillClient.getAll();
    };

    async findOne(data: {id: number}) {
        return await this.pillClient.getOneById(data);
    };

    async update(data: {id: number, payload: UpdatePillDto}) {
        return await this.pillClient.updatePill(data);
    };

    async delete(data: {id: number}) {
        return await this.pillClient.deletePill(data);
    }
}