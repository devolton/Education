import {IsNumber, IsString, Length, Min} from "class-validator";

export class UpdateCourseDto{
    @IsString({message: 'Must be a string'})
    @Length(2,128,{message:'Must have a number of characters greater than 2 and less than 128'})
    readonly title: string;
    @IsString({message: 'Must be a string'})
    @Length(2,256,{message:'Must have a number of characters greater than 2 and less than 256'})
    readonly shortDescription: string;
    @IsString({message: 'Must be string'})
    @Length(4,2048,{message:'Must have a number of characters greater than 4 and less than 2048'})
    readonly fullDescription: string;
    @IsNumber({}, {message: 'Must be a number'})
    @Min(1)
    readonly price: number;
    @IsString({message:'Must be a string'})
    @Length(2,32,{message:"Must have a number of characters greater than 8 and less than 32"})
    readonly slug: string;
}