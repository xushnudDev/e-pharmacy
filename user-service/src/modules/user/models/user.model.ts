import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Schema({collection: 'users',timestamps: true,versionKey: false})
export class User extends Model {
    @Prop({required: true})
    firstname: string;

    @Prop({required: true})
    lastname: string;

    @Prop({required: true,unique: true})
    email: string;

    @Prop({required: true})
    password: string;

    @Prop({required: true,unique: true})
    phone: string;
};

export const UserSchema = SchemaFactory.createForClass(User);