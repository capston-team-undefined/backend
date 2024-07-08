import { CanActivate, ExecutionContext, HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private authService : AuthService
  ){}
  async canActivate(context: ExecutionContext)  {
    try{
      const req = context.switchToHttp().getRequest();//요청객체 가져오기
      return await this.authService.verify_token(req);
    }
    catch (error) {
        throw new HttpException({},500)
    }
  }
}
