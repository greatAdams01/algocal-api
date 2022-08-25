import { Query, Resolver } from '@nestjs/graphql';
import { CreatorsService } from './creators.service';
import { CreatorDocument } from './schema/creator';

@Resolver('Creator')
export class CreatorsResolver {
  constructor(private readonly creatorsService: CreatorsService) {}

  @Query()
  creators(): Promise<CreatorDocument[]> {
    return this.creatorsService.getCreators()
  }
}
