import { Column, Model, Table } from "sequelize-typescript";

@Table({tableName: 'categories',timestamps: true})
export class Category extends Model {
    @Column({unique: true})
    name: string;

    @Column({})
    description: string;
}