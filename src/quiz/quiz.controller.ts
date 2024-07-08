import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFile, Req, HttpException, Query } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { execFile } from 'child_process';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Post("/create")
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @UploadedFile() file,
    @Body() createQuizDto: CreateQuizDto,
    @Req() req: Request
  ){
    const create = await this.quizService.create(file,req,createQuizDto);
    return new HttpException({...create},create.status_code)
  }

  @Post("/create/:uuid")
  @UseGuards(JwtAuthGuard)
  async like_create(@Req() req: Request, @Param('uuid') uuid: string){
    const create = await this.quizService.create_like(req,uuid);
    return new HttpException({...create},create.status_code)
  }

  @Get()
  async getQuizzes(
    @Query('page') page: string,
    @Query('page_size') page_size: string,
    @Query('sortBy') sortBy: string = 'date', // 'date' or 'likes'
    @Query('type') type?: string,
  ) {
    const pageNumber = parseInt(page, 10) || 1;
    const pageSizeNumber = parseInt(page_size, 10) || 10;
    const quizzes = await this.quizService.Pagination(pageNumber, pageSizeNumber, sortBy, type);
    return quizzes
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.quizService.findOne(+id);
  }

  @Delete(':uuid')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('uuid') uuid: string, @Req() req: Request) {
    const remove = this.quizService.remove(uuid,req);
    return new HttpException({...remove},(await remove).status_code)
  }
}
