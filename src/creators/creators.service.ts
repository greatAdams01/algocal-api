import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Creator, CreatorDocument } from './schema/creator';
import { CreatorDTO } from './schema/dto/creator.dto';
import { isEmail } from 'src/util/util';

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


    async addCreator(data: CreatorDTO): Promise<CreatorDocument> {
      if(!isEmail(data.email)) throw new BadRequestException(`Use a valid email address`)
      const creatorNameExist = await this.creatorModel.findOne({ creatorName: data.creatorname })
      if(creatorNameExist) throw new BadRequestException(`Creatorname already exists`)
      const userEmailExist = await this.creatorModel.findOne({ email: data.email })
      if(userEmailExist) throw new BadRequestException(`Email exists`)
      if(!data.description || !data.website) {
        throw new BadRequestException(`Add a description and website`)
      }
      try {
        const creator = await this.creatorModel.create(
          data
        )
        return creator
      } catch (error) {
        throw error
      }
    }
}
