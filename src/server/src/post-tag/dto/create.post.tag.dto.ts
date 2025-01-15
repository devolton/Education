import {IsString, Length} from "class-validator";

export class CreatePostTagDto{
    @IsString()
    @Length(2,16)
    readonly name:string;
}