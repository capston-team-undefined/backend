import { Module } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { QuizController } from './quiz.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quiz } from 'src/entities/quiz.entity';
import { MulterModule } from '@nestjs/platform-express';
import { MulterConfig } from 'src/config/multer.config';
import { QuizDetailsModule } from 'src/quiz_details/quiz_details.module';
import { QuizTag } from 'src/entities/quiz_tag.entity';
import { User } from 'src/entities/user.entity';
import { Likes } from 'src/entities/quiz_like.entity';

@Module({
  imports: [
    AuthModule,
    QuizDetailsModule,
    TypeOrmModule.forFeature([Quiz,QuizTag,User,Likes]),
    MulterModule.registerAsync({
      useFactory: MulterConfig
    })
  ],
  controllers: [QuizController],
  providers: [QuizService],
})
export class QuizModule {}
