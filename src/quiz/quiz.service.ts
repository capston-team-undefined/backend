import { Injectable } from '@nestjs/common';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Quiz } from 'src/entities/quiz.entity';
import { Repository } from 'typeorm';
import { Request } from 'express';
import { AuthService } from 'src/auth/auth.service';
import "dotenv/config.js";
import { v4 as uuidv4 } from 'uuid';
import { QuizTag } from 'src/entities/quiz_tag.entity';
import { User } from 'src/entities/user.entity';
import { createBaseQuizQueryBuilder } from 'src/utils/quiz-query.util';
import { Likes } from 'src/entities/quiz_like.entity';

@Injectable()
export class QuizService {
  constructor(
    @InjectRepository(Quiz)
    private quiz: Repository<Quiz>,

    @InjectRepository(QuizTag)
    private quizTag: Repository<QuizTag>,

    @InjectRepository(User)
    private user : Repository<User>,

    @InjectRepository(Likes)
    private like : Repository<Likes>,

    private authSerivce: AuthService
  ){}

  async create( file: any, req: Request, createQuizDto: CreateQuizDto) {

    try{
      const user_info = await this.authSerivce.verify_token(req)
      const {uuid} = user_info
      const default_img = process.env.DEFAULTIMG
      const quiz_uuid = uuidv4()
      const {tag} = createQuizDto

      const test = JSON.parse(tag)
      console.log(tag)
      
      if (!Array.isArray(test)) {
        return {status_code: 400,}
      }

        if(file==undefined){
          await this.quiz_insert(createQuizDto,uuid,default_img,quiz_uuid)
          return {status_code: 201, msg: "ok",quiz_uuid}
        }
  
      const img = process.env.DOMAIN+"/"+ file.key
      await this.quiz_insert(createQuizDto,uuid,img,quiz_uuid)

      test.forEach(async item => {
        await this.tag_insert(item,quiz_uuid)
      })
  
      return {status_code: 201, msg: "ok",quiz_uuid}
      
    }catch (error) {
      console.log(error)
      return {status_code: 500,}
    }
  }

  async create_like(req: Request,quiz_uuid: string){
    try{
      const user_info = await this.authSerivce.verify_token(req)
      const {uuid} = user_info

      const like_info = await this.like.findOne({
        where: {
            quiz: { uuid: quiz_uuid }, 
            user: { uuid: uuid }  
        }
    });

      if(like_info){
        return {status_code: 400, msg: "이미 좋아요를 표시한 항목"}
      }
      await this.inser_like(uuid,quiz_uuid)
      return {status_code: 201, msg: "ok"}
    }catch(error){
      console.log(error)
      return {status_code: 500, msg: "ok"}

    }
  }


  async inser_like(user_uuid: string, quiz_uuid: string){
    await this.like.insert({
      user: user_uuid,
      quiz: quiz_uuid,
    })
  }

  async quiz_insert(createQuizDto: CreateQuizDto,user_uuid: string,img: string,quiz_uuid: string){
    const {title,type} = createQuizDto

    await this.quiz.insert({
      title,
      user: user_uuid,
      img,
      uuid: quiz_uuid,
      type,
      createdAt : new Date(),

    })
  }



  async tag_insert(tag: string, quiz_uuid: string){

    await this.quizTag.insert({
      quiz: quiz_uuid,
      tag
    })
  }


  async Pagination(page: number, page_size: number, sortBy: string, type?: string) {
    const quizzes = await this.quiz
    .createQueryBuilder('quiz') // Quiz 엔티티에 대한 쿼리 빌더
    .leftJoinAndSelect('quiz.user', 'user') // User 엔티티와 조인하여 사용자 정보 로드
    .leftJoinAndSelect('quiz.tag', 'tag')
    .loadRelationCountAndMap('quiz.likesCount', 'quiz.likes') 
    .getMany();
    
    return {quizzes}

  }



  async findOne(id: number) {
    return `This action returns a #${id} quiz`
  }

  async remove(uuid: string,req: Request) {
    try{
      const user_info = await this.authSerivce.verify_token(req)
      const user_uuid =user_info.uuid

      const quiz = await this.quiz.findOne({
        where: {
          uuid: uuid,
          user: { uuid: user_uuid } 
        }
      })

      if(!quiz){
        return {status_code: 409, msg: "일치하는문제없음"}
      }

      await this.quiz.remove(quiz)
      return {status_code: 200, msg:"ok",}

    }catch (error) {
      console.log(error)
      return {status_code: 500}
    }
  }
}
