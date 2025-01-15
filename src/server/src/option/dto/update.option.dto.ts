import {IsString, Length} from "class-validator";
import {Optional, Options} from "@nestjs/common";

export class UpdateOptionDto{
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