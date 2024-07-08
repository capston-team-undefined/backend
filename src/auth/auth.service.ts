import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { TransformationType } from 'class-transformer';
import { LoginDto } from './dto/login-auth.dto';
import * as bcrypt from 'bcrypt';
import { Request } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private jwtService : JwtService,
    @InjectRepository(User)
    private user: Repository<User>
  ){}


  async verify_token(req : Request){
    try{
      const token = this.getToken(req)
      if (!token) {
        return false
      }

      const verify = await this.jwtService.verifyAsync(token,{secret: process.env.JwtSecret})
      const {uuid} = verify
      const find_user_uuid = await this.find_user_uuid(uuid)

      if(!find_user_uuid){
        return false
      }

      return verify

    }catch (error){
      return false
    }
  }

  async login(loginDto: LoginDto){
    try{
      const {id,password} = loginDto
      const find_user_id = await this.find_user_id(id)

      if(!find_user_id){
        return {status_code: 400,msg: "id"}
      }

      const {salt,uuid,name} = find_user_id
      const hash = await bcrypt.hash(password, salt);

      if(hash!=find_user_id.password){
        return {status_code: 400, msg: "password"}
      }

      const token = await this.jwtService.signAsync({uuid,name})

      return {status_code: 200, msg:" ok", token}

    }catch(error){

      console.log(error)
      return {status_code: 500}
    }
  }

  find_user_uuid(uuid : string){
    return this.user.findOne({where : {uuid}})
  }

  find_user_id(id){
    return this.user.findOne({where : {id: id}})
  }

  getToken(req : Request){
    const authorization = req.headers.authorization;
    if(authorization && authorization.startsWith("Bearer ")){//Bearer으로 시작하는 문자열 찾기 
      return authorization.split(" ")[1]//공백을 기준으로 배열로 분할 
    }
    return null
  }

}
