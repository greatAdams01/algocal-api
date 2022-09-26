import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// export type CreatorDocument =  & Document;
export type CreatorDocument = Creator &
  Document & {
    _id: any;
    _doc: any;
  };

@Schema({
  timestamps: true
})
export class Creator {
  @Prop({ unique: true, required: true })
  name: string;
  @Prop({ unique: true, required: true })
  email: string;
  @Prop({ required: true })
  password: string;
  @Prop({ required: true })
  description: string;
  @Prop({ required: true, default: 'Fill in' })
  website: string;
}

export const CreatorSchema = SchemaFactory.createForClass(Creator)