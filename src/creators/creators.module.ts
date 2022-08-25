import { Module } from '@nestjs/common';
import { CreatorsService } from './creators.service';
import { CreatorsResolver } from './creators.resolver';

@Module({
  providers: [CreatorsResolver, CreatorsService]
})
export class CreatorsModule {}
