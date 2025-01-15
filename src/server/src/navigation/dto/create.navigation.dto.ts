import {IsNumber, IsString, Min} from "class-validator";
import {Optional} from "@nestjs/common";

export class CreateNavigationDto{
    @IsString()
    href:string;
    @IsString()
    title:string;
    @IsNumber()
    @Min(1)
    @Optional()
    order:number;
    @IsNumber()
    @Min(1)
    @Optional()
    parentId:number;
}