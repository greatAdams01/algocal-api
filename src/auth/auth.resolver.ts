import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { Creator, CreatorSchema, CreatorDocument } from 'src/creators/schema/creator.schema';
import { AuthService } from './auth.service';

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation()
  join(@Args() { address }) {
    return this.authService.join(address)
  }

  @Mutation()
  signup(@Args() creatorInput): Promise<CreatorDocument> {
    return this.authService.addCreator(creatorInput)
  }
}
