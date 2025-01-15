import {IsString, Length, Matches} from "class-validator";

export class UpdateRoleDto{
    @IsString()
    @Length(4,16)
    @Matches(/^[a-z]{4,16}/, { message: 'Role must contain only lowercase letters' })
    readonly value:string;
    @IsString()
    @Length(4,256)
    readonly description:string;
}