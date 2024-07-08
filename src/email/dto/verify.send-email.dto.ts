import { IsEmail, Length } from "class-validator";

export class VerificationEmailDto{
    @IsEmail()
    @Length(10,100)
    email : string

}