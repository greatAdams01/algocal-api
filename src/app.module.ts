import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import type { ClientOpts } from 'redis';
import * as redisStore from 'cache-manager-redis-store';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { createFalse } from '@ts-morph/common/lib/typescript';
import { CreatorsModule } from './creators/creators.module';
import { EventsModule } from './events/events.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.mongoDB_URI),
    CacheModule.register<ClientOpts>({
      store: redisStore,
      host: process.env.redis_URI,
      port: process.env.redis_PORT,
      password: process.env.redis_PASSWORD
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
        outputAs: 'class'
      },
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      introspection: true,
      installSubscriptionHandlers: true,
      path: '/graphql',
      cors: true,
    }),
    CreatorsModule,
    EventsModule,
    AuthModule,
  ]
})
export class AppModule {}
