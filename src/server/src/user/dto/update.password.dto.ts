import {IsString, Length, Matches} from "class-validator";

export class UpdatePasswordDto{
    @IsString()
    @Length(8, 64)
    @Matches(/^(?=.*[A-Z])(?=.*\d)[A-Za-z0-9_]{8,32}$/, {message: 'Password must be between 8 and 32 characters long, contain at least one uppercase letter, one digit, and only letters, numbers, or underscores'})
    password:string;
    @IsString()
    @Length(8, 64)
    @Matches(/^(?=.*[A-Z])(?=.*\d)[A-Za-z0-9_]{8,32}$/, {message: 'Password must be between 8 and 32 characters long, contain at least one uppercase letter, one digit, and only letters, numbers, or underscores'})
    newPassword:string;
}