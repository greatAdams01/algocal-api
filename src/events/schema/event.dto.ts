export enum category {
  Hackaton = 'Hackaton',
  Devents = 'Devents',
  Spaces = 'Spaces'
}

export enum eventType {
  Live = 'Live',
  Online = 'Online'
}

export class createEventDTO {
  title: string
  date: string
  time: string
  imageName: string
  imageType: string
  imageFile: string
  description: string
  subDescription: string
  venue: string
  category: string
  type: string
  link: string
}