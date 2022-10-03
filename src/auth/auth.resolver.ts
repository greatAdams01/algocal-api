import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { Creator, CreatorSchema, CreatorDocument } from 'src/creators/schema/creator.schema';
import { AuthService } from './auth.service';

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation()
  login(@Args() { email, password }) {
    return this.authService.login(email, password)
  }

  @Mutation()
  signup(@Args() creatorInput): Promise<CreatorDocument> {
    const { Inputs } = creatorInput
    return this.authService.addCreator(Inputs)
  }
}
