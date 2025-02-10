import {Optional} from "@nestjs/common";
import {IsBoolean, IsDate, IsString} from "class-validator";

export class UpdateChatMessageDto {
    @IsString()
    message:string;
    @IsBoolean()
    isRead:boolean;
    @Optional()
    @IsDate()
    updatedAt:Date

}