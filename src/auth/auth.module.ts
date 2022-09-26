import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { Creator, CreatorSchema } from 'src/creators/schema/creator.schema';
import config from 'src/util/config';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports:[
    MongooseModule.forFeature([
      { name: Creator.name, schema: CreatorSchema }
    ]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: config.secret,
      signOptions: { expiresIn: '30d' },
    }),
  ],
  providers: [AuthResolver, AuthService, JwtStrategy]
})
export class AuthModule {}
