import {IsEmail, IsString, Length} from "class-validator";

export class CreateMessageDto{
    @IsString()
    @Length(2,64)
    readonly name:string;
    @IsEmail()
    readonly email:string;
    @IsString()
    @Length(1,1024)
    readonly message:string;
}