import {IsString, Length, Matches} from "class-validator";

export class UpdateLoginDto{
    @IsString()
    @Length(2, 64)
    @Matches(/^[a-z0-9._]{2,32}$/, {message: 'Login must be between 2 and 32 characters long and can only contain lowercase letters, numbers, dots, and underscores.'})
    newLogin:string;

    @IsString()
    @Length(8, 64)
    @Matches(/^(?=.*[A-Z])(?=.*\d)[A-Za-z0-9_]{8,32}$/, {message: 'Password must be between 8 and 32 characters long, contain at least one uppercase letter, one digit, and only letters, numbers, or underscores'})
    confirmPassword:string;
}