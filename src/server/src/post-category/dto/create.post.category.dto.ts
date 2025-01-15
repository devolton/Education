import {IsString, Length} from "class-validator";

export class CreatePostCategoryDto{
    @IsString()
    @Length(2,32)
    readonly name:string;
    @IsString()
    @Length(8,128)
    readonly description:string;
    @IsString()
    @Length(8,256)
    readonly thumbnailPath:string;

}