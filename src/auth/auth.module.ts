import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { Creator, CreatorSchema } from 'src/creators/schema/creator';

@Module({
  imports:[
    MongooseModule.forFeature([
      { name: Creator.name, schema: CreatorSchema }
    ])
  ],
  providers: [AuthResolver, AuthService]
})
export class AuthModule {}
