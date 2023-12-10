import { Test, TestingModule } from '@nestjs/testing';
import { PubsubResolver } from './pubsub.resolver';

describe('PubsubResolver', () => {
  let resolver: PubsubResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PubsubResolver],
    }).compile();

    resolver = module.get<PubsubResolver>(PubsubResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
