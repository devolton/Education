import {IsString, Length, IsNumber, Min, IsInt, Max} from "class-validator";

export class CreateEventDetailDto{
    @IsString()
    @Length(2,64)
    readonly company:string;
    @IsNumber()
    @Min(1)
    readonly ticketPrice:number;
    @IsInt()
    @Min(1)
    @Max(1000)
    readonly numberOfPlaces:number;
}