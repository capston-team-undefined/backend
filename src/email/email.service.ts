import { Inject, Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { v4 as uuidv4 } from 'uuid';
import { generate_random_id } from 'src/utils/random-number';
import { VerificationEmailDto } from './dto/verify.send-email.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';

@Injectable()
export class EmailService {
  constructor(
    private readonly mailerService : MailerService,
    @Inject(CACHE_MANAGER)
    private cacheManager : Cache
  ){}

  async send_verify_token(verificationEmailDto: VerificationEmailDto){
    try{
      const to = verificationEmailDto.email
      const verify_token = generate_random_id(6)
      await this.send_mail(to,verify_token)
      await this.cacheManager.set(to,`${verify_token}`,300000)

      return {status_code: 200,}
    }catch (error) {
      return {status_code: 500,}
    }
  }

  async verify_email(verifyEmailDto : VerifyEmailDto){
    const {email,token} = verifyEmailDto
    const verify_email = await this.cacheManager.get(email)

    if(verify_email == undefined){
      return {status_code: 400, msg: "인증번호부터 발송해주세요"}
    }

    if(verify_email!= token){
      return {status_code: 400, msg: "인증번호 일치하지 않음"}
    }

    await this.cacheManager.del(email)
    await this.cacheManager.set(email,true,300000)
    return {status_code: 200, msg: "인증됨"}

  }

  async verify_email_check(email: string) : Promise<boolean>{
    const verify_email = await this.cacheManager.get(email)

    if(verify_email||verify_email!=true){
      return false
    }

    return true
  }


  async send_mail(to: string,text: string){
      await this.mailerService.sendMail({
        to : to,
        from : "bimilbimil613@gmail.com",
        subject : "인증번호를보내요",  
        text : `${text}`,
        html : ""
      })
      return true
  }


  

}
