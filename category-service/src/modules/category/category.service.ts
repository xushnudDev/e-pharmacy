import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from './model';
import { CreateCategoryDto, UpdateCategoryDto } from './dtos';

@Injectable()
export class CategoryService {
  constructor(@InjectModel(Category) private categoryModel: typeof Category) {}

  async getAll() {
    const categories = await this.categoryModel.findAll();
    return {
      message: 'Categories fetched successfully',
      count: categories.length,
      data: categories,
    };
  }

  async getOneById(id: number) {
    const category = await this.categoryModel.findByPk(id);
    return {
      message: 'Category fetched successfully',
      data: category,
    };
  }

  async create(payload: CreateCategoryDto) {
    const founded = await this.categoryModel.findOne({
      where: { name: payload.name },
    });
    if (founded) throw new ConflictException('Category already exists');

    const newCategry = await this.categoryModel.create({
      name: payload.name,
      description: payload.description,
    });

    return {
      message: 'Category created successfully',
      data: newCategry,
    };
  }

  async update(id: number, payload: UpdateCategoryDto) {
    if (!id) {
      throw new NotFoundException('User not found');
    }

    const [affectedRows] = await this.categoryModel.update(payload, {
      where: {
        id: id,
      },
    });

    if (affectedRows === 0) {
      throw new NotFoundException('User not updated or not found');
    }

    const updatedUser = await this.categoryModel.findByPk(id);

    return {
      message: 'User updated successfully',
      data: updatedUser,
    };
  }

  async delete(id: number) {
    const category = await this.categoryModel.findByPk(id);
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return this.categoryModel.destroy({ where: { id: id } });
  }
}
