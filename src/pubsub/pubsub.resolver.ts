import { Resolver, Subscription } from '@nestjs/graphql';
import { Dispatch } from './interfaces/pubsub.interface';

@Resolver()
export class PubsubResolver {
  @Subscription((returns) => Dispatch)
  listen() {
    console.log('s');
  }
}
