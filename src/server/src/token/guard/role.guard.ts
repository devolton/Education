import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from "@nestjs/common";
import {Observable} from "rxjs";
import {JwtService} from "@nestjs/jwt";
import {Reflector} from "@nestjs/core";
import {ROLES_KEY} from "../../decorators/roles.auth.decorator";
import process from "process";

@Injectable()
export class RoleGuard implements CanActivate{
    constructor(private  jwtService:JwtService,
                private reflector:Reflector) {}
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        try{
            const requiredRoles= this.reflector.getAllAndOverride(ROLES_KEY,[
                context.getHandler(),
                context.getClass()
            ]);
            if(!requiredRoles){
                return true;
            }
            const req = context.switchToHttp().getRequest();
            const authHeader = req.headers.authorization;
            const bearer = authHeader.split(' ')[0];
            const accessToken = authHeader.split(' ')[1]
            if(bearer!=='Bearer'|| !accessToken){
                throw new UnauthorizedException({message: 'User no authorised'})
            }
            const user = this.jwtService.verify(accessToken,{secret:"DEVOLTONLABSaccess"});
            if(!user){
                throw new UnauthorizedException(({message:"User is not authorised!"}));
            }
            return user.roles.some(role=>requiredRoles.includes(role.value));

        }
        catch (e){
            console.log(e);
            throw new UnauthorizedException({message: 'User is not authorised'})
        }
    }

}