import { IsBoolean, IsString } from "class-validator";

export class QuizChoiceOptionDto{

    @IsString()
    optionText: string;

    @IsBoolean()
    isCorrect: boolean;
}