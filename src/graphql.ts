
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class CreatorInput {
    creatorname: string;
    email: string;
    description: string;
    website: string;
}

export class Creator {
    _id?: Nullable<string>;
    creatorname: string;
    email: string;
    description: string;
    website: string;
}

export abstract class IQuery {
    abstract creators(): Creator[] | Promise<Creator[]>;
}

export abstract class IMutation {
    abstract addcreator(Inputs: CreatorInput): Creator | Promise<Creator>;
}

type Nullable<T> = T | null;
