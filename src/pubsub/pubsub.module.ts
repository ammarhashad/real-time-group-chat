import { Global, Module } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import { PubsubResolver } from './pubsub.resolver';

@Global()
@Module({
  providers: [
    {
      provide: 'PUB_SUB',
      useClass: PubSub,
    },
    PubsubResolver,
  ],
  exports: ['PUB_SUB'],
})
export class PubsubModule {}
