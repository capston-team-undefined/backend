import { Module } from '@nestjs/common';
import { QuizDetailsService } from './quiz_details.service';
import { QuizDetailsController } from './quiz_details.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizDetails } from 'src/entities/quiz_details.entity';
import { AuthModule } from 'src/auth/auth.module';
import { QuizChoiceOption } from 'src/entities/quiz_choice_option.entity';
import { Quiz } from 'src/entities/quiz.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      QuizDetails,
      QuizChoiceOption,
      Quiz
    ]),
    AuthModule
  ],
  controllers: [QuizDetailsController],
  providers: [QuizDetailsService],
  exports: [QuizDetailsService]
})
export class QuizDetailsModule {}
