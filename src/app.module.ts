import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLError } from 'graphql';
import { GroupModule } from './group/group.module';
import { MembershipModule } from './membership/membership.module';
import { MessageModule } from './message/message.module';
import { PubsubModule } from './pubsub/pubsub.module';

require('dotenv').config();

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      formatError: (error: GraphQLError) => {
        console.log(error);
        return error;
      },
      subscriptions: {
        'subscriptions-transport-ws': {
          path: '/graphql',

          onConnect: (connectionParams) => {
            return {
              req: {
                headers: { authorization: connectionParams.authorization },
              },
            };
          },
        },
      },
      autoSchemaFile: 'schema.gql',
    }),
    UserModule,
    GroupModule,
    MembershipModule,
    MessageModule,
    PubsubModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
