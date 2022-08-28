
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

export class AuthData {
    creatorId: string;
    token: string;
}

export abstract class IQuery {
    abstract login(email: string, password: string): AuthData | Promise<AuthData>;

    abstract creators(): Creator[] | Promise<Creator[]>;

    abstract creator(): Creator | Promise<Creator>;
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

type Nullable<T> = T | null;
