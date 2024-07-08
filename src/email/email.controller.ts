import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException } from '@nestjs/common';
import { EmailService } from './email.service';
import { VerificationEmailDto } from './dto/verify.send-email.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}
  
  @Post("/send_verify_token")
  async send_verify_token(@Body() verificationEmailDto: VerificationEmailDto){
    const send_verify_token = await this.emailService.send_verify_token(verificationEmailDto)
    return new HttpException({...send_verify_token}, send_verify_token.status_code)
  }

  @Post("/verify_token")
  async verify_email(@Body() verifyEmailDto : VerifyEmailDto){
    const verify_token = await this.emailService.verify_email(verifyEmailDto)
    return new HttpException({...verify_token}, verify_token.status_code)
  }


}
