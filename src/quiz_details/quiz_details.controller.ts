import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, HttpException } from '@nestjs/common';
import { QuizDetailsService } from './quiz_details.service';
import { CreateQuizDetailDto } from './dto/create-quiz_detail.dto';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { Request } from 'express';

@Controller('quiz-details')
export class QuizDetailsController {
  constructor(private readonly quizDetailsService: QuizDetailsService) {}

  @Post(":uuid")
  @UseGuards(JwtAuthGuard)
  async create(
  @Body() createQuizDetailDto: CreateQuizDetailDto,
  @Param('uuid') uuid: string,
  @Req() req: Request
  ){
    const create = await this.quizDetailsService.create(createQuizDetailDto,req,uuid)
    return new HttpException({...create},create.status_code)
  }

  @Get()
  findAll() {
    return this.quizDetailsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const test = await this.quizDetailsService.findOne(id);
    return new HttpException({...test},test.status_code)

  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.quizDetailsService.remove(+id);
  }
}
