import {HttpException, HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common';
import {AuthUserDto} from "../user/dto/auth.user.dto";
import {CreateUserDto} from "../user/dto/create.user.dto";
import {UserService} from "../user/service/user.service";
import * as bcrypt from 'bcryptjs'
import {User} from "../user/model/user.model";
import {TokenService} from "../token/token.service";
import {Token} from "../token/model/token.model";

@Injectable()
export class AuthService {
    constructor(private userService: UserService,
                private tokenService: TokenService) {
    }

    async login(userDto: AuthUserDto) {
        const user = await this.validateUser(userDto);
        if(!user){
            throw  new UnauthorizedException('User is not authorize');
        }
        const payload = {
            id: user.id,
            login: user.login,
            roles: user.roles
        }
        const tokens = await this.tokenService.generateTokens(payload);
        await this.tokenService.saveToken(user.id, tokens.refreshToken);
        return {user: payload, tokens: tokens};
    }


    async registration(userDto: CreateUserDto) {
        const isUniqueCredentials = await this.userService.isUniqueUser(userDto.login, userDto.email);
        if (!isUniqueCredentials) {
            throw new HttpException('User with current email is already exist!', HttpStatus.BAD_REQUEST);
        }
        const hashPassword = await bcrypt.hash(userDto.password, 5);
        const user = await this.userService.createUser({...userDto, password: hashPassword});
        const payload = {
            id: user.id,
            login: user.login,
            roles: user.roles
        }
        let tokens = await this.tokenService.generateTokens(payload);
        await this.tokenService.saveToken(user.id, tokens.refreshToken);
        return {user: payload, tokens: tokens};

    }

    async logout(refreshToken: string): Promise<Token> {
        return await this.tokenService.removeToken(refreshToken);
    }

    async refresh(refreshToken: string) {
        if (!refreshToken) {
            throw  new UnauthorizedException('User is not authorize');
        }
        const userData = await this.tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await this.tokenService.findRefreshToken(refreshToken);
        if (!userData || !tokenFromDb) {
            throw  new UnauthorizedException('Token is not valid');
        }
        const user = await this.userService.getUserById(userData.id);
        const payload = {
            id: user.id,
            login: user.login,
            roles: user.roles
        }
        let tokens = await this.tokenService.generateTokens(payload);
        await this.tokenService.saveToken(user.id, tokens.refreshToken);
        return {user: payload, tokens: tokens};

    }

    private async validateUser(userDto): Promise<User> {
        try {
            const user = await this.userService.getUserByLogin(userDto.login);
            if(!user){
                return null;
            }
            let passwordEquals = await bcrypt.compare(userDto.password, user.password);
            if (user && passwordEquals) {
                return user;
            }
        } catch (e) {
            throw new UnauthorizedException({message: 'Incorrect login or password!'})
        }
    }

}
