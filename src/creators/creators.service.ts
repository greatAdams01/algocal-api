import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Creator, CreatorDocument } from './schema/creator';

@Injectable()
export class CreatorsService {
  constructor(
    @InjectModel(Creator.name) private readonly creatorModel: Model<CreatorDocument>,
    ){}


    async getCreators(): Promise<CreatorDocument[]> {
      try {
        const creators = await this.creatorModel.find()
        return creators
      } catch (error) {
        throw error
      }
    }
}
