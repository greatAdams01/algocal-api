import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { Creator, CreatorSchema, CreatorDocument } from 'src/creators/schema/creator';
import { AuthService } from './auth.service';

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {


  }
  @Mutation()
  addcreator(@Args() creatorInput): Promise<CreatorDocument> {
    const { Inputs } = creatorInput
    return this.authService.addCreator(Inputs)
  }
}
