import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailConfig } from 'src/config/email.config';

@Module({
  imports: [MailerModule.forRootAsync({
    useClass : MailConfig
  })],
  controllers: [EmailController],
  providers: [EmailService],
  exports: [EmailService]
})
export class EmailModule {}
