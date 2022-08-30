export enum category {
  Hackaton = 'Hackaton',
  Devents = 'Devents'
}

export enum eventType {
  Live = 'Live',
  Online = 'Online'
}

export class createEventDTO {
  title: string
  date: string
  time: string
  description: string
  subDescription: string
  venue: string
  category: string
  type: string
  link: string
}