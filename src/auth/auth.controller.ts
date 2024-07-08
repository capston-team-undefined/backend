import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login-auth.dto';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/login")
  async login(@Body() loginDto: LoginDto){
    const login = await this.authService.login(loginDto)
    return new HttpException({...login},login.status_code)
  }

}
