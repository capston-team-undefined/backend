import { IsEmail, IsString, Length } from "class-validator";

export class VerifyEmailDto{
    @IsEmail()
    @Length(10,100)
    email : string

    @IsString()
    @Length(6,6)
    token: string

}