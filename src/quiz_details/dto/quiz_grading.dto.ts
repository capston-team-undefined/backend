import { IsString } from "class-validator";

export class QuizGrading{
    @IsString()
    detailDt_uuid : string

    @IsString()
    answer : string
}