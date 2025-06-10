import { Column, Model, Table } from "sequelize-typescript";

@Table({tableName: 'pills',timestamps: true})
export class Pill extends Model {
    @Column({unique: true, allowNull: false})
    name: string;

    @Column({allowNull: false})
    description: string;

    @Column({unique: true})
    code: string;

    @Column({allowNull: false})
    price: number;
    
    @Column({allowNull: false})
    quantity: number;

    @Column({})
    categoryId: number;

    @Column({})
    userId: string;

    @Column({defaultValue: true})
    in_stock: boolean;
}