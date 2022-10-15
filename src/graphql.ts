
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class CreatorInput {
    name: string;
    password: string;
    email: string;
}

export class Ifile {
    file: string;
    type: string;
    name: string;
}

export class EventInput {
    title: string;
    date: string;
    time: string;
    description: string;
    venue: string;
    category: string;
    link: string;
}

export class AuthData {
    creatorId: string;
    token: string;
}

export abstract class IMutation {
    abstract join(address: string): AuthData | Promise<AuthData>;

    abstract signup(name: string, password: string, email: string): Creator | Promise<Creator>;

    abstract createEvent(title: string, date: string, time: string, organizer: string, description: string, venue: string, category: string, imageName: string, imageType: string, imageFile: string, link: string): Event | Promise<Event>;
}

export class Creator {
    _id?: Nullable<string>;
    image: string;
    address: string;
    about: string;
    website: string;
    followedEvents: Event[];
}

export abstract class IQuery {
    abstract creators(): Creator[] | Promise<Creator[]>;

    abstract creator(): Creator | Promise<Creator>;

    abstract events(): Event[] | Promise<Event[]>;

    abstract event(eventId: string): Event | Promise<Event>;

    abstract creatorEvents(): Event[] | Promise<Event[]>;
}

export class Event {
    _id: string;
    title: string;
    date: string;
    time: string;
    description: string;
    organizer: string;
    image: string;
    host: string;
    followers: number;
    reactions: number;
    venue: string;
    category: string;
    link: string;
    createdAt: string;
    updatedAt: string;
}

type Nullable<T> = T | null;
