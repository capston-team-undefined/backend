import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private user : Repository<User>,
    private emailService: EmailService
  ){}

  async sign(createUserDto : CreateUserDto){
    try{
      const {name, id,email,password} = createUserDto
      const find_id = await this.find_id(id)
      const find_name = await this.find_name(name)
      const find_email = await this.find_email(email)
      const salt = await bcrypt.genSalt()
      const hash = await bcrypt.hash(password, salt);
      const verify_email_check = await this.emailService.verify_email_check(email)

    if(find_id){
      return {status_code: 400, msg :"아이디 중복"}
    }

    if(find_name){
      return {status_code: 400, msg :"이름 중복"}
    }

    if(find_email){
      return {status_code: 400, msg :"이메일 중복"}
    }

    if(verify_email_check==false){
      return {status_code: 400, msg :"이메일 인증부터"}
    }

    await this.insert_user(createUserDto,hash,salt)

    return {status_code : 201}
    
    }catch (error) {
      console.log(error)
      return {status_code : 500}
    }
  }
  
  async insert_user(createUserDto: CreateUserDto,hash : string, salt : string) {
    const {id,email,name} = createUserDto 

    await this.user.insert({
      id: id,
      email: email,
      name: name,
      password: hash,
      salt: salt
    })
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOne(id: number) {

  }

  update(id: number, updateUserDto: UpdateUserDto) {
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }


  async find_id(id : string){
    const user = await this.user.findOne({where : {id}})
    return user
  }

  async find_name(name : string){
    const user = await this.user.findOne({where : {name}})
    return user
  }

  async find_email(email : string){
    const user = await this.user.findOne({where : {email}})
    return user
  }
}
