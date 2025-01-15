import {IsString, Length} from "class-validator";

export class UpdatePostTagDto{
    @IsString()
    @Length(2,16)
    name:string;
}