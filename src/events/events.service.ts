import { BadRequestException, CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cache } from 'cache-manager'
import { Model } from 'mongoose';
import { cloudinaryUpload } from 'src/util/cloudinary';
import { createEventDTO, IEvent } from './schema/event.dto';
import { Event, EventDocument } from './schema/event.schema';

@Injectable()
export class EventsService {
  constructor(
    @InjectModel(Event.name) private readonly eventModel: Model<EventDocument>,
    
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    )
    {}

    async events(): Promise<EventDocument[]> {
      try {
        let cacheEvents: EventDocument[] = await this.cacheManager.get('events');
        let result;
        
        const eventsList = await this.eventModel.find()
        if (!cacheEvents) {
        
          const check = await this.cacheManager.set('events', eventsList,  { ttl:80 });
          console.log(check, 'fired')
          result = await this.cacheManager.get('events');
        }
        cacheEvents = result
        // console.log(cacheEvents)
        
        return eventsList
      } catch (error) {
        console.log(error)
      }
    }

    async findOne({ eventId }) {
      try {
        const event = await this.eventModel.findById(eventId)
        return event
      } catch (error) {
        throw error
      }
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

   async deleteEvent({ eventId }, creatorId): Promise<EventDocument>  {
      try {
        let event = await this.eventModel.findById(eventId)
        if(!event.host === creatorId) {
          throw new BadRequestException('Not allowed to delete')
        }
        event = await this.eventModel.findByIdAndDelete({ _id: eventId })
          
        return event
      } catch (error) {
        throw error
      }
   }
}
