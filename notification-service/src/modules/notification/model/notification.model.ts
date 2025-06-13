import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({tableName: 'notifications',timestamps: true})
export class Notification extends Model{
    @Column({type: DataType.STRING})
    userId: string;

    @Column({type: DataType.STRING})
    message: string;

    @Column({type: DataType.STRING})
    email: string;

    @Column({type: DataType.STRING})
    type: string;

    @Column({type: DataType.STRING})
    status: string;
}