
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
    abstract login(email: string, password: string): AuthData | Promise<AuthData>;

    abstract signup(name: string, password: string, email: string): Creator | Promise<Creator>;

    abstract createEvent(title: string, date: string, time: string, organizer: string, description: string, venue: string, category: string, link: string): Event | Promise<Event>;
}

export class Creator {
    _id?: Nullable<string>;
    name: string;
    email: string;
    about: string;
    website: string;
}

export abstract class IQuery {
    abstract creators(): Creator[] | Promise<Creator[]>;

    abstract creator(): Creator | Promise<Creator>;

    abstract events(): Event[] | Promise<Event[]>;
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
