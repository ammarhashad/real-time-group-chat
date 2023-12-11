import { Resolver, Subscription } from '@nestjs/graphql';
import { PubSubPayload } from './interfaces/pubsub.interface';
import { Inject } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';

@Resolver()
export class PubsubResolver {
  constructor(@Inject('PUB_SUB') private pubSub: PubSub) {}
  @Subscription((returns) => PubSubPayload)
  listen() {
    return this.pubSub.asyncIterator('newAction');
  }
}
