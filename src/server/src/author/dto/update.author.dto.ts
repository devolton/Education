import {AuthorPositionEnum} from "../author.position.enum";
import {IsEnum, IsNumber, IsString, Length, Min} from "class-validator";

export class UpdateAuthorDto{
    @IsString()
    @Length(2,32)
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
    @Min(0)
    readonly positionIndex:number;
}