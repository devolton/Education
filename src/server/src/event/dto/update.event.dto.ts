import {IsString, Length} from "class-validator";

export class UpdateEventDto{
    @IsString()
    @Length(2,128)
    readonly title:string;
    @IsString()
    @Length(2,256)
    readonly shortDescription:string;
    @IsString()
    @Length(2,2048)
    readonly fullDescription:string;
    @IsString()
    @Length(2,64)
    readonly slug:string;
}