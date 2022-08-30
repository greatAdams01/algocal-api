import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { createEventDTO } from './schema/event.dto';
import { Event, EventDocument } from './schema/event.schema';

@Injectable()
export class EventsService {
  constructor(
    @InjectModel(Event.name) private readonly eventModel: Model<EventDocument>
    )
    {}

    async events(): Promise<EventDocument[]> {
      const events = await this.eventModel.find()
      return events
    }

    async createEvent(data: createEventDTO, creatorId: string): Promise<EventDocument> {
      const event = await this.eventModel.create({
        ...data,
        host: creatorId
      })

      return event
    }
}
