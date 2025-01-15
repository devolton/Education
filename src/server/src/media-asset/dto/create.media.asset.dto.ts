import {MediaAssetCategoryEnum} from "../common/media.asset.category.enum";
import {IsString, Max, Min} from "class-validator";

export class CreateMediaAssetDto {
    @IsString()
    @Min(4,{message:'Minimum 4 symbols'})
    @Max(32, {message:'Maximum 32 symbols'})
    name: string;
    @IsString()
    @Min(8,{message:'Minimum 8 symbols'})
    @Max(256,{message:'Maximum 256 symbols'})
    path:string;
    category:MediaAssetCategoryEnum;
    @IsString()
    alt:string;
}