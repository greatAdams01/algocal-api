import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { cloudinaryUpload } from 'src/util/cloudinary';
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

    async creatorEvent(creatorId: string): Promise<EventDocument[]> {
      try {
        const events = await this.eventModel.find({ host: creatorId })
        return events
      } catch (error) {
        throw error
      }
    }


    async createEvent(data: createEventDTO, creatorId: string): Promise<EventDocument> {
      const userId =`${creatorId}`
      const payload = {
        file: data.imageFile,
        type: data.type,
        name: data.imageName
      }
      const image = await cloudinaryUpload(payload.file).catch((err) => {
        throw err;
      });

      const res = userId.toString()
      const event = await this.eventModel.create({
        ...data,
        image,
        host: res
      })

      console.log(event)

      return event
    }
}
