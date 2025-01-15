import {IsString, Min} from "class-validator";

export class UpdateMediaAssetDto{
    @IsString()
    alt:string;

}