import { Resolver } from '@nestjs/graphql';
import { EventsService } from './events.service';

@Resolver('Event')
export class EventsResolver {
  constructor(private readonly eventsService: EventsService) {}
}
