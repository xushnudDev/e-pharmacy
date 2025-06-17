import { Controller } from "@nestjs/common";
import { PillService } from "./pill.service";
import { MessagePattern } from "@nestjs/microservices";
import { CreatePillDto, SearchPillDto, UpdatePillDto } from "./dtos";

@Controller()
export class PillController {
    constructor(private readonly pillService: PillService) {}

    @MessagePattern('get_all_pills')
    getAll() {
        return this.pillService.findAll();
    };

    @MessagePattern('get_pill_by_id')
    getOne(data: {id: number}) {
        return this.pillService.findOne(data.id);
    };

    @MessagePattern('get_pills_by_category')
    getPillsByCategory(data: {categoryId: number}) {
        return this.pillService.getByCategory(data.categoryId);
    };

    @MessagePattern('get_pills_by_user')
    getPillsByUser(data: {userId: string}) {
        return this.pillService.getByUser(data.userId);
    }

    @MessagePattern('create_pill')
    create(data: CreatePillDto) {
        return this.pillService.create(data);
    };

    @MessagePattern('update_pill')
    update(data: {id: number, payload: UpdatePillDto}) {
        return this.pillService.update(data.id, data.payload);
    };

    @MessagePattern('delete_pill')
    delete(data: {id: number}) {
        return this.pillService.remove(data.id);
    };

    @MessagePattern('search_pills')
    search(data: SearchPillDto) {
        return this.pillService.search(data);
    }
}