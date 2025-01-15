import {ArrayMaxSize, ArrayMinSize, IsArray, IsInt, IsString, Length, Min, MIN} from "class-validator";
import {Optional} from "@nestjs/common";

export class CreatePostDto{
    @IsString()
    @Length(2,256)
    readonly title:string;

    @IsString()
    @Length(2,256)
    readonly shortDescription:string;

    @IsString()
    @Length(8,2048)
    readonly content:string;

    @IsString()
    @Length(2,256)
    readonly thumbnailPath:string;

    @IsString()
    @Length(2,256)
    readonly posterPath:string;

    @IsString()
    @Length(2,16)
    @Optional()
    readonly imgAlt:string;

    @IsString()
    @Length(2,32)
    readonly slug:string;

    @IsArray()
    @ArrayMinSize(0)
    @ArrayMaxSize(8)
    @Optional()
    readonly tagsIds:number[];
    @IsArray()
    @ArrayMinSize(0)
    @ArrayMaxSize(8)
    @Optional()
    readonly categoriesIds:number[];

    @IsInt()
    @Min(1)
    readonly authorId:number;
}