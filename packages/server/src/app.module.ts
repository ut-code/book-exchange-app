import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { PrismaModule } from './services/prisma/prisma.module';
import { ResolversModule } from './resolvers/resolvers.module';
import { AuthModule } from './services/auth/auth.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), '../../schema.graphql'),
      buildSchemaOptions: { dateScalarMode: 'timestamp' },
    }),
    PrismaModule,
    ResolversModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
