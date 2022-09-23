
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class CreatorInput {
    creatorName: string;
    password: string;
    email: string;
    description: string;
    website: string;
}

export class EventInput {
    title: string;
    date: string;
    time: string;
    description: string;
    subDescription: string;
    venue: string;
    category: string;
    type: string;
    link: string;
}

export class AuthData {
    creatorId: string;
    token: string;
}

export abstract class IQuery {
    abstract login(email: string, password: string): AuthData | Promise<AuthData>;

    abstract creators(): Creator[] | Promise<Creator[]>;

    abstract creator(): Creator | Promise<Creator>;

    abstract events(): Event[] | Promise<Event[]>;
}

export abstract class IMutation {
    abstract addcreator(Inputs: CreatorInput): Creator | Promise<Creator>;

    abstract createEvent(inputs: EventInput): Event | Promise<Event>;
}

export class Creator {
    _id?: Nullable<string>;
    creatorName: string;
    email: string;
    description: string;
    website: string;
}

export class Event {
    _id: string;
    title: string;
    date: string;
    time: string;
    description: string;
    subDescription: string;
    host: string;
    followers: number;
    reactions: number;
    venue: string;
    category: string;
    type: string;
    link: string;
    createdAt: string;
    updatedAt: string;
}

type Nullable<T> = T | null;
