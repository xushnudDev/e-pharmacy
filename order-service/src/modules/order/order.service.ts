import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Order } from './model';
import { CreateOrderDto, UpdateOrderDto } from './dtos';
import { userInfo } from 'os';

@Injectable()
export class OrderService {
  constructor(@InjectModel(Order) private orderModel: typeof Order) {}

  async getAll() {
    const orders = await this.orderModel.findAll();
    return {
      message: 'Orders fetched successfully',
      data: orders,
      count: orders.length,
    };
  }

  async getById(id: number) {
    const order = await this.orderModel.findByPk(id);
    return {
      message: 'Order fetched successfully',
      data: order,
    };
  }

  async createOrder(createOrder: CreateOrderDto) {
    const totalPrice = createOrder.quantity * createOrder.price;

    const order = await this.orderModel.create({
      userId: createOrder.userId,
      categoryId: createOrder.categoryId,
      pillId: createOrder.pillId,
      quantity: createOrder.quantity,
      price: totalPrice,
      status: createOrder.status || 'pending',
    });

    return {
      message: 'Order created successfully',
      data: order,
    };
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    if (!id) throw new NotFoundException('Order not found');

    const [affectedRows] = await this.orderModel.update(updateOrderDto, {
      where: { id: id },
    });

    if (affectedRows === 0) throw new NotFoundException('Order not found');

    const updateOrder = await this.orderModel.findByPk(id);

    return {
      message: 'Order updated successfully',
      data: updateOrder,
    };
  }

  async delete(id: number) {
    const order = await this.orderModel.findByPk(id, {
      include: { all: true },
    });
    if (!order) throw new NotFoundException('Order not found');
    await this.orderModel.destroy({ where: { id } });
    return {
      message: 'Order deleted successfully',
      data: order,
    };
  }
}
