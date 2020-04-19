import { Test, TestingModule } from '@nestjs/testing';
import { EntryTypesController } from './entry-types.controller';

describe('EntryTypes Controller', () => {
  let controller: EntryTypesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EntryTypesController],
    }).compile();

    controller = module.get<EntryTypesController>(EntryTypesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
