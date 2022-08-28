
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

export abstract class IMutation {
    abstract addcreator(Inputs: CreatorInput): Creator | Promise<Creator>;
}

export class Creator {
    _id?: Nullable<string>;
    creatorName: string;
    email: string;
    description: string;
    website: string;
}

export abstract class IQuery {
    abstract creators(): Creator[] | Promise<Creator[]>;
}

type Nullable<T> = T | null;
