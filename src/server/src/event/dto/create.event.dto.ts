import {IsString, Length} from "class-validator";


export class CreateEventDto{
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
    @Length(8,512)
    readonly thumbnailPath:string;
    @IsString()
    @Length(8,512)
    readonly posterPath:string;
    @IsString()
    @Length(2,64)
    readonly slug:string;

}