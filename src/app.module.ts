import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormConfig } from 'orm.config';
import { EmailModule } from './email/email.module';
import { CacheModule } from '@nestjs/cache-manager';
import { QuizModule } from './quiz/quiz.module';
import { QuizDetailsModule } from './quiz_details/quiz_details.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    EmailModule,
    TypeOrmModule.forRootAsync({
      useFactory : ormConfig
    }),
    CacheModule.register({
      ttl : 1200000,
      max : 200,
      isGlobal : true
    }),
    QuizModule,
    QuizDetailsModule,
    
  ],
  controllers: [],
  providers: [], 
})
export class AppModule {}
