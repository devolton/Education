import {PostStatusEnum} from "../post.status.enum";
import {IsDate, IsEnum, IsInt, Min} from "class-validator";

export class CreatePostInfoDto{
    @IsInt()
    @Min(0)
    readonly viewsCount:number;
    @IsEnum(PostStatusEnum)
    readonly status:PostStatusEnum;
    @IsDate()
    readonly dateOfCreated: Date;
    @IsDate()
    readonly dateOfPublished:Date;
}