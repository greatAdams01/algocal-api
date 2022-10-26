import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Creator, CreatorDocument } from 'src/creators/schema/creator.schema';
import { category, eventType } from './event.dto';


export type EventDocument = Event &
  Document & {
    _id: any;
    _doc: any;
  };

  
  @Schema({
    timestamps: true
  })
  export class Event {
    @Prop({ required: true })
    title: string;
    @Prop({ required: true })
    date: string;
    @Prop({ required: true })
    time: string;
    @Prop({ required: true })
    description: string;
    @Prop({ required: true })
    organizer: string;
    @Prop({ required: true , default: 'https://images.prismic.io/algorandcom/bd152374-1cdf-4949-a6f2-226975e153d6_1.jpg?auto=compress%2Cformat&rect=0%2C0%2C1231%2C143&w=1200&h=139'})
    image: string;
    @Prop({ required: true, type: Types.ObjectId, ref: 'Creator', autopopulate: true  })
    host: Creator;
    @Prop({ required: true, default: 0 })
    followers: number;
    @Prop({ required: true, default: 0 })
    reactions: number;
    @Prop({ required: true })
    venue: string;
    @Prop({ 
      required: true,
      enum: category,
      default: category.Devents
     })
    category: string;
    @Prop({ required: true })
    link: string;
  }

  export const EventSchema = SchemaFactory.createForClass(Event);