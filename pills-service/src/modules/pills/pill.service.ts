import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Pill } from './model';
import { CreatePillDto, UpdatePillDto } from './dtos';

@Injectable()
export class PillService {
  constructor(@InjectModel(Pill) private pillModel: typeof Pill) {}

  async findAll() {
    const pills = await this.pillModel.findAll();
    return {
      message: 'Pills fetched successfully',
      count: pills.length,
      data: pills,
    };
  }

  async findOne(id: number) {
    const pill = await this.pillModel.findByPk(id);
    if (!pill) throw new NotFoundException('Pill not found');

    return {
      message: 'Pill fetched successfully',
      data: pill,
    };
  }

  async getByCategory(categoryId: number) {
    const pills = await this.pillModel.findAll({
      where: {
        categoryId: categoryId,
      },
    });

    return {
      message: 'Pills fetched successfully',
      count: pills.length,
      data: pills,
    };
  }

  async getByUser(userId: string) {
    const pills = await this.pillModel.findAll({
      where: {
        userId: userId,
      },
    });
    return {
      message: 'Pills fetched successfully',
      count: pills.length,
      data: pills,
    };
  }
  async create(payload: CreatePillDto) {    
    const founded = await this.pillModel.findOne({
      where: {
        code: payload.code,
      },
    });
    
    if (founded) throw new ConflictException('Pill already exists');

    const pill = await this.pillModel.create({
      name: payload.name,
      description: payload.description,
      code: payload.code,
      price: payload.price,
      quantity: payload.quantity,
      categoryId: payload.categoryId,
      userId: payload.userId,
      in_stock: payload.in_stock,
    });

    return {
      message: 'Pill created successfully',
      data: pill,
    };
  }

  async update(id: number, payload: UpdatePillDto) {
    if (!id) throw new NotFoundException('Pill not found');

    const [affectedRows] = await this.pillModel.update(payload, {
      where: {
        id,
      },
    });

    if (affectedRows === 0) throw new NotFoundException('Pill not found');

    const updatePill = await this.pillModel.findByPk(id);

    return {
      message: 'Pill updated successfully',
      data: updatePill,
    };
  }

  async remove(id: number) {
    if (!id) throw new NotFoundException('Pill not found');

    return await this.pillModel.destroy({
      where: {
        id,
      },
    });
  }
}
