import {Injectable} from '@nestjs/common';
import {JwtService} from "@nestjs/jwt";
import * as process from "process";
import {InjectModel} from "@nestjs/sequelize";
import {Token} from "./model/token.model";

@Injectable()
export class TokenService {
    constructor(private jwtService: JwtService,
                @InjectModel(Token) private tokenRepository: typeof Token) {
    }

    async generateTokens(payload) {
        const accessToken = this.jwtService.sign(payload, {
            secret: process.env.JWT_ACCESS_SECRET,
            expiresIn: '30m'
        });
        const refreshToken = this.jwtService.sign(payload, {
            secret: process.env.JWT_REFRESH_SECRET,
            expiresIn: '30d'
        });
        return {
            accessToken,
            refreshToken
        };
    }

    async saveToken(userId: number, refreshToken: string): Promise<Token> {
        const tokenData = await this.tokenRepository.findOne({where: {userId: userId}});
        if (tokenData) {
            return await tokenData.update({refreshToken: refreshToken});
        }
        return await this.tokenRepository.create({userId: userId, refreshToken: refreshToken});

    }

    async removeToken(refreshToken): Promise<Token> {
        const tokenObj = await this.tokenRepository.findOne({where: {refreshToken: refreshToken}});
        if (tokenObj) {
            return await tokenObj.update({refreshToken: null});
        }
        return tokenObj
    }

    async validateRefreshToken(refreshToken: string) {
        try {
            return this.jwtService.verify(refreshToken, {secret: process.env.JWT_REFRESH_SECRET});


        } catch (e) {
            return null
        }
    }
    async validateAccessToken(accessToken: string) {
        try {
            return this.jwtService.verify(accessToken, {secret: process.env.JWT_ACCESS_SECRET});

        } catch (e) {
            return null
        }
    }
    async findRefreshToken(refreshToken:string){
        return await this.tokenRepository.findOne({where:{refreshToken:refreshToken}});
    }

}
