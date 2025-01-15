import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import process from "process";

@Injectable()
export class JwtAuthGuard implements CanActivate{
    constructor( private jwtService:JwtService) {}
   async canActivate(context: ExecutionContext): Promise<boolean>  {
      const req = context.switchToHttp().getRequest();
      try{
          const authHeader = req.headers.authorization;
          if(!authHeader){
              throw new UnauthorizedException('Authentication token is missing');

          }
          const bearer = authHeader.split(' ')[0];
          const accessToken = authHeader.split(' ')[1]
          if(bearer!=='Bearer'){
              throw new UnauthorizedException({message: 'User no authorised'})
          }
          const userData =this.jwtService.verify(accessToken, {secret: 'DEVOLTONLABSaccess'});
          if(!userData){
              throw new UnauthorizedException({message: 'User no authorised'})
          }
          return true;

      }
      catch (e){
          console.log(e);
          throw new UnauthorizedException({message: 'User is not authorised'})
      }
    }

}