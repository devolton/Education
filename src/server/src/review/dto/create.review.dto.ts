import {IsInt, IsOptional, IsString, Length, Max, Min} from "class-validator";

export class CreateReviewDto {
    @IsString()
    @Length(1,1024)
    readonly review: string;
    @IsInt()
    @Min(1)
    @Max(5)
    readonly rating: number;
    @IsOptional()
    @IsInt()
     userId:number;
    @IsInt()
    readonly courseId:number;

}