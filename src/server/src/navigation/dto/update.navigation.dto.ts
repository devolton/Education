import {Optional} from "@nestjs/common";
import {IsNumber, IsString, Min} from "class-validator";

export class UpdateNavigationDto{
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