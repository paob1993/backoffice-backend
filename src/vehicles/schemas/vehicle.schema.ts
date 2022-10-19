import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Date, Document } from 'mongoose';
import { Color } from '../../colors/schemas/color.schema';
import { Brand } from "../../brands/schemas/brand.schema"
import { User } from 'src/users/schemas/user.schema';

export type VehicleDocument = Vehicle & Document;

@Schema()
export class Vehicle {
    @Prop({ required: true })
    identification: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Brand' })
    brand: Brand;

    @Prop({ required: true })
    year: number;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Color' })
    color: Color;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: User;

    @Prop({ type: Date })
    date: Date;

    @Prop({ default: true })
    status: boolean;

    @Prop({ default: false })
    assigned: boolean;

    @Prop()
    image: string;

    @Prop({ type: Date, default: Date.now })
    createdAt = Date;

    @Prop({ type: Date, default: Date.now })
    updatedAt: Date;

    @Prop({ type: Date, default: null })
    deletedAt: Date;

}


export const VehicleSchema = SchemaFactory.createForClass(Vehicle);