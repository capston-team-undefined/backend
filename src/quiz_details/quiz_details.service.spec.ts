import { Test, TestingModule } from '@nestjs/testing';
import { QuizDetailsService } from './quiz_details.service';

describe('QuizDetailsService', () => {
  let service: QuizDetailsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuizDetailsService],
    }).compile();

    service = module.get<QuizDetailsService>(QuizDetailsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
