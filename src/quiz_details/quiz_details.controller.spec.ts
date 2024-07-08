import { Test, TestingModule } from '@nestjs/testing';
import { QuizDetailsController } from './quiz_details.controller';
import { QuizDetailsService } from './quiz_details.service';

describe('QuizDetailsController', () => {
  let controller: QuizDetailsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuizDetailsController],
      providers: [QuizDetailsService],
    }).compile();

    controller = module.get<QuizDetailsController>(QuizDetailsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
