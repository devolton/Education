import {ArrayMaxSize, ArrayMinSize, IsArray, IsString, Length} from "class-validator";
import {Optional} from "@nestjs/common";

export class UpdatePostDto{
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
    @Length(2,16)
    readonly altImg:string;

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
}