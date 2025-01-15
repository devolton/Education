import {
    CallHandler,
    ExecutionContext,
    HttpException,
    HttpStatus,
    Injectable,
    NestInterceptor,
    UnauthorizedException
} from "@nestjs/common";
import {Observable} from "rxjs";
import {JwtService} from "@nestjs/jwt";
import {request} from "express";

@Injectable()
export class AddUserIdInterceptor implements NestInterceptor {
    constructor(private jwtService: JwtService) {
    }

    async intercept(context: ExecutionContext, next: CallHandler<any>): Promise<Observable<any>> {
        try {
            const request = context.switchToHttp().getRequest();
            const authHeader = request.headers.authorization;
            if (authHeader) {
                const accessToken = authHeader.split(' ')[1];
                const userData = this.jwtService.verify(accessToken, {secret: 'DEVOLTONLABSaccess'});
                if (userData) {
                    request.body.userId = userData.id;
                }
            }
        } catch (ex) {
            throw new UnauthorizedException('Unauthorized access');
        }
        return next.handle();


    }

}