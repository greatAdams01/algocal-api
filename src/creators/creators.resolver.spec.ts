import { Test, TestingModule } from '@nestjs/testing';
import { CreatorsResolver } from './creators.resolver';
import { CreatorsService } from './creators.service';

describe('CreatorsResolver', () => {
  let resolver: CreatorsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreatorsResolver, CreatorsService],
    }).compile();

    resolver = module.get<CreatorsResolver>(CreatorsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
