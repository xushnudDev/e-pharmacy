import { Controller } from '@nestjs/common';
import { CategoryService } from './category.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateCategoryDto } from './dtos';

@Controller()
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @MessagePattern('get_all_categories')
  findAll() {
    return this.categoryService.getAll();
  }

  @MessagePattern('get_category_by_id')
  findOne(@Payload() data: { id: number }) {
    return this.categoryService.getOneById(data.id);
  }

  @MessagePattern('create_category')
  create(@Payload() data: CreateCategoryDto) {
    return this.categoryService.create(data);
  }

  @MessagePattern('update_category')
  update(@Payload() data: { id: number; payload: CreateCategoryDto }) {
    return this.categoryService.update(data.id, data.payload);
  }

  @MessagePattern('delete_category')
  delete(@Payload() data: { id: number }) {
    return this.categoryService.delete(data.id);
  }
}
