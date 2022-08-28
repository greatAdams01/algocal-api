import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreatorsService } from './creators.service';
import { CreatorDocument } from './schema/creator';
import { CreatorDTO } from './schema/dto/creator.dto';

@Resolver('Creator')
export class CreatorsResolver {
  constructor(private readonly creatorsService: CreatorsService) {}

  @Query()
  creators(): Promise<CreatorDocument[]> {
    return this.creatorsService.getCreators()
  }

}
