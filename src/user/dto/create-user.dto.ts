import { IsEmail, IsString, IsStrongPassword, Length } from "class-validator";

export class CreateUserDto {
    @IsString()
    @Length(10,30)
    id : string

    @IsString()
    @Length(1,10)
    name : string

    @IsEmail()
    @Length(10,100)
    email : string

    @IsStrongPassword()
    @Length(8,20)
    password : string
}
