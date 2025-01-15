import {PostStatusEnum} from "../post.status.enum";
import {IsEnum, IsInt, Min} from "class-validator";

export class UpdatePostInfoDto{
    @IsInt()
    @Min(1)
    readonly viewsCount : number;

    @IsEnum(PostStatusEnum)
    readonly status:PostStatusEnum;
}