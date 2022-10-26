import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentCreator, GQLoginGuard } from 'src/auth/guard/graphql.guard';
import { EventsService } from './events.service';
import { IEvent } from './schema/event.dto';
import { EventDocument } from './schema/event.schema';

@Resolver('Event')
export class EventsResolver {
  constructor(private readonly eventsService: EventsService) {}


  // Query

  @Query()
  events(): Promise<EventDocument[]> {
    return this.eventsService.events()
  }

  @Query()
  event(@Args() eventId): Promise<EventDocument> {
    return this.eventsService.findOne(eventId)
  }

  @Query()
  deleteEvent(@Args() eventId,  @CurrentCreator() creator): Promise<EventDocument>  {
    return this.eventsService.deleteEvent(eventId, creator._id)
  }



  // Mutations

  // Creator events
  @UseGuards(GQLoginGuard)
  @Query()
  creatorEvents(@CurrentCreator() creator): Promise<EventDocument[]>  {

    return this.eventsService.creatorEvent(creator)
  }

  @UseGuards(GQLoginGuard)
  @Mutation()
  createEvent(@Args() payload, @CurrentCreator() creator) {
    return this.eventsService.createEvent(payload, creator._id)
  }
}
