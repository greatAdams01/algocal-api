import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AuthenticationError } from 'apollo-server-express';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { Creator, CreatorDocument } from 'src/creators/schema/creator.schema';
import { CreatorDTO } from 'src/creators/schema/dto/creator.dto';
import { genPassHash, comparePass } from 'src/util/hash';
import { isEmail, strPass } from 'src/util/util';
import { AuthData } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Creator.name) private readonly creatorModel: Model<CreatorDocument>,
    private jwtService: JwtService,
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

    const token = await this.jwtService.sign({ creatorId: creator._id })

    return {
      creatorId: creator._id,
      token: token
    }
  }

  async addCreator(data: CreatorDTO): Promise<CreatorDocument> {
    // Check if valid email
    if(!isEmail(data.email)) throw new BadRequestException(`Use a valid email address`)

    // Check if name exist
    const nameExist = await this.creatorModel.findOne({ name: data.name })
    if(nameExist) throw new BadRequestException(`Name already exists`)

    // Check if email exists
    const userEmailExist = await this.creatorModel.findOne({ email: data.email })
    if(userEmailExist) throw new BadRequestException(`Email exists`)

    // Check if password is strong enogh
    if (!data.password || !strPass(data.password)) {
      throw new BadRequestException(`Add numbers and special characters`)
    }

    const hash = await genPassHash(data.password)
    const payload = {
      name: data.name,
      email: data.email,
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
