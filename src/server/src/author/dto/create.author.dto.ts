
import {IsEnum, IsNumber, IsString, Length} from "class-validator";

export class CreateAuthorDto{
    @IsString()
    @Length(2,64)
    readonly fullName:string;
    @IsString()
    @Length(8,256)
    readonly avatarPath:string;
    @IsString()
    @Length(8,128)
    readonly instagramHref:string;
    @IsString()
    @Length(8,128)
    readonly facebookHref:string;
    @IsString()
    @Length(8,128)
    readonly twitterHref:string;
    @IsString()
    @Length(4,256)
    readonly slogan:string;
    @IsNumber()
    readonly positionIndex:number;
}