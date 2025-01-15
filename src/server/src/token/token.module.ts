import {forwardRef, Module} from '@nestjs/common';
import {TokenService} from './token.service';
import {JwtModule} from "@nestjs/jwt";
import process from "process";
import {SequelizeModule} from "@nestjs/sequelize";
import {Token} from "./model/token.model";
import {JwtAuthGuard} from "./guard/jwt.auth.guard";

@Module({
    controllers: [],
    providers: [TokenService],
    imports: [
        SequelizeModule.forFeature([Token]),
        JwtModule.register({
            secret: 'process.env.JWT_SECRET'
        })],
    exports: [TokenService, JwtModule]
})
export class TokenModule {
}
