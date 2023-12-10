import { Test, TestingModule } from '@nestjs/testing';
import { MembershipResolver } from './membership.resolver';

describe('MembershipResolver', () => {
  let resolver: MembershipResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MembershipResolver],
    }).compile();

    resolver = module.get<MembershipResolver>(MembershipResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
