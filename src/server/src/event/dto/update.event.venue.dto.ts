import {IsDate, IsString, Length} from "class-validator";

export class UpdateEventVenueDto{
    @IsDate()
    readonly startDate:Date;
    @IsDate()
    readonly endDate:Date;
    @IsString()
    @Length(2,32)
    readonly city:string;

    @IsString()
    @Length(2,128)
    readonly street:string;
}