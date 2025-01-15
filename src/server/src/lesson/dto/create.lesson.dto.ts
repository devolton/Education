import {IsString, Length} from "class-validator";

export class CreateLessonDto{
    @IsString()
    @Length(2,64)
    readonly title:string;

    @IsString()
    @Length(2,512)
    readonly description:string;
}