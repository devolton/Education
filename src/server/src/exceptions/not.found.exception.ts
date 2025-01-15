import {HttpException, HttpStatus} from "@nestjs/common";

export class NotFoundException extends HttpException{
    constructor(entityName:string, entityId:number) {
        let response = `${entityName } with ID: ${entityId} not found!`;
        super(response,HttpStatus.NOT_FOUND);

    }
}