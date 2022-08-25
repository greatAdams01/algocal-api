import { Module } from '@nestjs/common';
import { CreatorsService } from './creators.service';
import { CreatorsResolver } from './creators.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Creator, CreatorSchema } from './schema/creator';

@Module({
  imports:[
    MongooseModule.forFeature([
      { name: Creator.name, schema: CreatorSchema }
    ])
  ],
  providers: [CreatorsResolver, CreatorsService]
})
export class CreatorsModule {}
