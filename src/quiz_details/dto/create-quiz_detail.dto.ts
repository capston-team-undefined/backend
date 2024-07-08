import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsString, ValidateNested } from "class-validator";
import { Entity, ManyToOne } from "typeorm";
import { QuizDetailDto } from "./quiz_detail.dto";

export class CreateQuizDetailDto {

    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({ each: true })
    @Type(() => QuizDetailDto)
    quizDetails: QuizDetailDto[];
}
