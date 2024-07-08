import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsEnum, IsString, Length, ValidateNested } from "class-validator";
import { QuizDetailDto } from "src/quiz_details/dto/quiz_detail.dto";

export enum CategoryType {
    자격증_취업 = '자격증/취업',
    취업 = '취업',
    중고등 = '중고등',
    언어_외국어 = '언어/외국어',
    기타 = '기타',
}

export class CreateQuizDto {
    @IsString()
    @Length(1,100)
    title: string

    @IsString()
    tag: string

    @IsEnum(CategoryType)
    type: '자격증/취업' | '취업' | '중고등' | '언어/외국어' | '기타';

}
