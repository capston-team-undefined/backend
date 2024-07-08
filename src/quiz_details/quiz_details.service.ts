import { Injectable } from '@nestjs/common';
import { CreateQuizDetailDto } from './dto/create-quiz_detail.dto';
import { Request } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { InjectRepository } from '@nestjs/typeorm';
import { QuizDetails } from 'src/entities/quiz_details.entity';
import { Repository } from 'typeorm';
import { QuizChoiceOption } from 'src/entities/quiz_choice_option.entity';
import { Quiz } from 'src/entities/quiz.entity';
import { QuizDetailDto } from './dto/quiz_detail.dto';
import { QuizChoiceOptionDto } from './dto/quiz_choice_option.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class QuizDetailsService {
  constructor(
    private authSerivce: AuthService,

    @InjectRepository(QuizDetails)
    private quizDetails: Repository<QuizDetails>,

    @InjectRepository(QuizChoiceOption)
    private quizChoiceOption: Repository<QuizChoiceOption>,

    @InjectRepository(Quiz)
    private quiz: Repository<Quiz>,
  ){}

  async create(createQuizDetailDto: CreateQuizDetailDto, req: Request,quiz_uuid: string){
    try{
      const user_info = await this.authSerivce.verify_token(req)
      const {uuid} = user_info
      const {quizDetails} = createQuizDetailDto;

      const quiz_info = await this.quiz.findOne({
        where: {uuid:quiz_uuid,
          user: {uuid: uuid}
        }
      })

      if(!quiz_info){
        return {status_code: 400, msg: "존재하지 않는문제"}
      }

      quizDetails.forEach(async item => {
        const quizDetail_uuid = uuidv4()
        await this.quizDetail_insert(item,quizDetail_uuid,quiz_uuid)

        if(item.type=="multiple_choice"){

          item.quizChoiceOption.forEach(async item => {
            await this.quizChoiceOption_insert(item,quizDetail_uuid)
          })

        }
      })
      return {status_code: 201,}
    }catch(error){
      console.log(error)
      return {status_code: 500,}
    }
  }

  async quizDetail_insert(quizDetailDto: QuizDetailDto,quizDetail_uuid: string,quiz_uuid: string){
    const {answer,type,question} = quizDetailDto
    console.log(quiz_uuid)
    await this.quizDetails.insert({
      answer,
      type,
      question,
      uuid: quizDetail_uuid,
      quiz: quiz_uuid
    })
  }

  async quizChoiceOption_insert(quizChoiceOptionDto: QuizChoiceOptionDto,quizDetail_uuid: string){
    const {optionText,isCorrect} = quizChoiceOptionDto

    await this.quizChoiceOption.insert({
      optionText,
      isCorrect,
      quizDetail: quizDetail_uuid
    })
  }

  findAll() {
    return `This action returns all quizDetails`;
  }

  async findOne(uuid: string) {
    try{
      const quizDetailsWithOptions = await this.quizDetails
      .createQueryBuilder('quiz_details')
      .leftJoinAndSelect('quiz_details.options', 'options')
      .select([
        'quiz_details.uuid',
        'quiz_details.question',
        'quiz_details.type',
        'options.uuid',
        'options.optionText',
      ])
      .where('quiz_details.quiz = :uuid', { uuid })
      .getMany();
      return {status_code: 201,quizDetailsWithOptions}
    }catch (error) {
      return {status_code: 500,}
    }
  }

  remove(id: number) {
    return `This action removes a #${id} quizDetail`;
  }
}
