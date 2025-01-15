import {IsInt, IsOptional, IsString, Length, Min} from "class-validator";

export class CreateCommentDto{
    @IsString()
    @Length(1,1048)
    readonly comment:string;
    @IsOptional()
    @IsInt()
    @Min(1)
    userId:number;
    @IsInt()
    @Min(1)
    parentId:number;

}