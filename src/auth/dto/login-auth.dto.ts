import { IsString, IsStrongPassword, Length } from "class-validator"

export class LoginDto{
    @IsString()
    @Length(10,30)
    id : string

    @IsStrongPassword()
    @Length(8,20)
    password : string
}