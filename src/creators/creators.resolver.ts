import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentCreator, GQLoginGuard } from 'src/auth/guard/graphql.guard';
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

  @UseGuards(GQLoginGuard)
  @Query()
  creator(@CurrentCreator() creator) {
    return creator
  }

}
