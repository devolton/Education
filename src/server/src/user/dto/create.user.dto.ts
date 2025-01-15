import {IsArray, IsEmail, IsString, Length, Matches} from "class-validator";

export class CreateUserDto{
    @IsString()
    @Length(2,32)
    @Matches(/^[A-Za-zА-Яа-яЁё]{2,32}$/, { message: 'Name must be between 2 and 32 characters long and contain only letters' })
    name:string;

    @IsString()
    @Length(4,32)
    @Matches(/^[A-Za-zА-Яа-яЁё]{4,32}$/, { message: 'Name must be between 4 and 32 characters long and contain only letters' })
    surname:string;

    @IsString()
    @Length(4,32)
    @Matches(/^[A-Za-zА-Яа-яЁё]{4,32}$/, { message: 'Name must be between 4 and 32 characters long and contain only letters' })
    middleName:string;

    @IsString()
    @Length(6,64)
    @IsEmail()
    email:string;

    @IsString()
    @Length(2,64)
    @Matches(/^[a-z0-9._]{2,32}$/, { message: 'Login must be between 2 and 32 characters long and can only contain lowercase letters, numbers, dots, and underscores.' })
    login:string;

    @IsString()
    @Length(4,256)
    avatarPath:string;

    @IsString()
    @Length(8,32)
    @Matches(/^(?=.*[A-Z])(?=.*\d)[A-Za-z0-9_]{8,32}$/,{message:'Password must be between 8 and 32 characters long, contain at least one uppercase letter, one digit, and only letters, numbers, or underscores'})
    password:string;

}