import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { Creator, CreatorSchema } from 'src/creators/schema/creator';
import config from 'src/util/config';

@Module({
  imports:[
    MongooseModule.forFeature([
      { name: Creator.name, schema: CreatorSchema }
    ]),
    JwtModule.register({
      secret: config.secret,
      signOptions: { expiresIn: '30d' },
    }),
  ],
  providers: [AuthResolver, AuthService]
})
export class AuthModule {}
