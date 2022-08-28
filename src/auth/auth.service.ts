import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Creator, CreatorDocument } from 'src/creators/schema/creator';
import { CreatorDTO } from 'src/creators/schema/dto/creator.dto';
import { isEmail, strPass } from 'src/util/util';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Creator.name) private readonly creatorModel: Model<CreatorDocument>,
  ){}

  async addCreator(data: CreatorDTO): Promise<CreatorDocument> {
    if(!isEmail(data.email)) throw new BadRequestException(`Use a valid email address`)
    const creatorNameExist = await this.creatorModel.findOne({ creatorName: data.creatorName })
    if(creatorNameExist) throw new BadRequestException(`Creatorname already exists`)
    const userEmailExist = await this.creatorModel.findOne({ email: data.email })
    if(userEmailExist) throw new BadRequestException(`Email exists`)
    if(!data.description || !data.website) {
      throw new BadRequestException(`Add a description and website`)
    }
    if (!data.password || !strPass(data.password)) {
      throw new BadRequestException(`Add a strong Password`)
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
