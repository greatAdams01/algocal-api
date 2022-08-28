import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AuthenticationError } from 'apollo-server-express';
import { Model } from 'mongoose';
import { Creator, CreatorDocument } from 'src/creators/schema/creator';
import { CreatorDTO } from 'src/creators/schema/dto/creator.dto';
import { genPassHash, comparePass } from 'src/util/hash';
import { isEmail, strPass } from 'src/util/util';
import { AuthData } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Creator.name) private readonly creatorModel: Model<CreatorDocument>,
  ){}


  async login(email:string, password: string): Promise<AuthData> {

    const creator: CreatorDocument = await this.creatorModel.findOne({ email: email })
    if (!creator) {
      throw new AuthenticationError('Email or Password invaild')
    }
    const isPass = await comparePass(password, creator.password)

    if (!isPass) {
      throw new AuthenticationError('Email or Password invaild')
    }

    return {
      userId: creator._id,
      token: 'test'
    }
  }

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
    const hash = await genPassHash(data.password)
    const payload = {
      creatorName: data.creatorName,
      email: data.email,
      description: data.description,
      website: data.website,
      password: hash
    }
    try {
      const creator = await this.creatorModel.create(
        payload
      )
      return creator
    } catch (error) {
      throw error
    }
  }
}
