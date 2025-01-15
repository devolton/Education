import {Body, Controller, Get, Next, Post, Put, Req, Res, UseGuards, UseInterceptors} from '@nestjs/common';
import {AuthService} from './auth.service';
import {AuthUserDto} from "../user/dto/auth.user.dto";
import {Response,Request} from 'express'
import {CreateUserDto} from "../user/dto/create.user.dto";
import {JwtAuthGuard} from "../token/guard/jwt.auth.guard";
import {AddUserIdInterceptor} from "../interceptors/add.user.id.interceptor";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    @Post('/login')
    async login(@Body('user') userDto: AuthUserDto,@Res() res:Response) {
        let userAndTokens=await this.authService.login(userDto)
        let refreshToken=userAndTokens.tokens.refreshToken;
        res.cookie('refreshToken',refreshToken,{
            maxAge:30 * 24 * 60*60*1000,
            httpOnly:true,
            // secure  :true
        })
        return res.json(userAndTokens);
    }

    @Post('/registration')
    async registration(@Body('user') userDto: CreateUserDto,@Res() res:Response) {
        let userAndTokens=await this.authService.registration(userDto)
        let refreshToken=userAndTokens.tokens.refreshToken;
        res.cookie('refreshToken',refreshToken,{
            maxAge:30 * 24 * 60*60*1000,
            httpOnly:true,
            // secure  :true
        })
        return res.json(userAndTokens);
    }
    @UseGuards(JwtAuthGuard)
    @Put('/logout')
    async logout(@Req() req:Request,@Res()res:Response){
            const refreshToken = req.cookies['refreshToken'];
            res.clearCookie('refreshToken');
            const token = await this.authService.logout(refreshToken);
            return res.json(token);


    }

    @Put('/refresh')
    async refresh(@Req() req:Request,@Res() res:Response ){
        const refreshToken = req.cookies['refreshToken'];
        let userAndTokens= await this.authService.refresh(refreshToken);

        res.cookie('refreshToken',userAndTokens.tokens.refreshToken,{
            maxAge:30 * 24 * 60*60*1000,
            httpOnly:true,
            // secure  :true
        })
        return res.json(userAndTokens);
    }
}
