import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Event } from 'src/events/schema/event.schema';

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
  @Prop({ required: true , default: 'https://images.prismic.io/algorandcom/bd152374-1cdf-4949-a6f2-226975e153d6_1.jpg?auto=compress%2Cformat&rect=0%2C0%2C1231%2C143&w=1200&h=139'})
  image: string;
  @Prop({ unique: true, required: true })
  address: string;
  @Prop({ required: true, default: 'Fill in' })
  about: string;
  @Prop({ required: true, default: 'Fill in' })
  website: string;
  @Prop({ type: Types.ObjectId, ref: 'Event', autopopulate: true })
  followedEvents: Event[];
}

export const CreatorSchema = SchemaFactory.createForClass(Creator)