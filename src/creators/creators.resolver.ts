import { Resolver } from '@nestjs/graphql';
import { CreatorsService } from './creators.service';

@Resolver('Creator')
export class CreatorsResolver {
  constructor(private readonly creatorsService: CreatorsService) {}
}
