import { Column, Model, Table } from "sequelize-typescript";

@Table({tableName:"orders",timestamps: true})
export class Order extends Model {
    @Column({})
    userId: string;

    @Column({})
    categoryId: number;

    @Column({})
    pillId: number;

    @Column({})
    quantity: number;

    @Column({})
    totalPrice: number;

    @Column({})
    status: string;
}