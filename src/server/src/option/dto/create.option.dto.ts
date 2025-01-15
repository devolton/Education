import {IsString, Length} from "class-validator";
import {Optional} from "@nestjs/common";

export class CreateOptionDto {
    @IsString()
    @Length(2,32)
    readonly name:string;
    @IsString()
    @Length(2,64)
    readonly value:string;
    @IsString()
    @Length(2,32)
    @Optional()
    readonly relation:string;

}