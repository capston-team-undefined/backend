import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsEnum, IsOptional, IsString } from "class-validator";
import { QuizChoiceOption } from "src/entities/quiz_choice_option.entity";
import { QuizChoiceOptionDto } from "./quiz_choice_option.dto";

enum QuizType {
    SHORT_ANSWER = 'short_answer',
    LONG_ANSWER = 'long_answer',
    MULTIPLE_CHOICE = 'multiple_choice',
    OX = 'ox',
}

export class QuizDetailDto{
    @IsString()
    question: string;

    @IsEnum(QuizType)
    type: QuizType

    @IsString()
    @IsOptional()
    answer: string

    @Type(()=>QuizChoiceOption)
    @IsOptional()
    @IsArray()
    @ArrayMinSize(1)
    quizChoiceOption: QuizChoiceOptionDto[]
}