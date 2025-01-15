import {HttpException, HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {User} from "../model/user.model";
import {Role} from "../../role/model/role.model";
import {CreateUserDto} from "../dto/create.user.dto";
import {RoleService} from "../../role/role.service";
import {Review} from "../../review/model/review.model";
import {UserToRole} from "../model/user.to.role.model";
import {UpdateUserDto} from "../dto/update.user.dto";
import {Sequelize} from "sequelize-typescript";
import {ReviewService} from "../../review/review.service";
import * as bcrypt from 'bcryptjs';
import {FilesService} from "../../files/files.service";
import {Op} from "sequelize";
import {PaginationService} from "../../pagination/pagination.service";
import {UpdatePasswordDto} from "../dto/update.password.dto";
import {UpdateLoginDto} from "../dto/update.login.dto";
import {Config} from "../../Config";

@Injectable()
export class UserService {
    constructor(@InjectModel(User) private userRepository: typeof User,
                @InjectModel(UserToRole) private userToRoleRepository: typeof UserToRole,
                private filesService: FilesService,
                private roleService: RoleService,
                private reviewService: ReviewService,
                private paginationService: PaginationService,
                private sequelize: Sequelize) {
    }

    async getUserByLogin(login: string): Promise<User> {
        return await this.userRepository.findOne({
            where: {login: login},
            include: [{model: Role, attributes: ['value']}]
        });
    }

    async createUser(userDto: CreateUserDto, avatar: Express.Multer.File = null): Promise<User> {
        const transaction = await this.sequelize.transaction();
        let updatedAvatarPath = userDto.avatarPath;
        try {
            if (avatar) {
                updatedAvatarPath = await this.filesService.createFile(avatar, userDto.login, Config.PATH.USER.AVATAR_FOLDER);
            }
            const hashPassword = await bcrypt.hash(userDto.password, 5);
            let createdUser = await this.userRepository.create({
                ...userDto,
                password: hashPassword,
                avatarPath: updatedAvatarPath
            }, {transaction});

            const role = await this.roleService.getRoleByValue('user');
            if (role) {
                await this.userToRoleRepository.create({userId: createdUser.id, roleId: role.id}, {transaction});
            }
            await transaction.commit();
            return createdUser;
        } catch (err) {
            await transaction.rollback();
            throw new HttpException('Created user error!', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async updateUserAvatar(userId: number, avatar: Express.Multer.File): Promise<User> {
        let user = await this.userRepository.findByPk(userId);
        let avatarPath = await this.filesService.createFile(avatar, user.login, Config.PATH.USER.AVATAR_FOLDER);
        return await user.update({avatarPath: avatarPath});

    }

    async isUniqueUser(login: string, email: string): Promise<boolean> {
        let isUniqueLogin = await this.userRepository.findOne({where: {login: login}}) === null;
        let isUniqueEmail = await this.userRepository.findOne({where: {email: email}}) === null;
        return isUniqueEmail && isUniqueLogin;
    }

    async getAllUsers(pageNum: number = 1, itemsPerPage: number = 100, sortField: string = "id", sortType: string = 'asc', search: string = '') {
        let usersCount = await this.userRepository.count();
        let pagination = await this.paginationService.createNavigation(pageNum, itemsPerPage, usersCount);
        let limit = itemsPerPage;
        let offset = (pageNum - 1) * itemsPerPage;
        const searchParts = search.split(" ").map(part => `%${part}%`);

        const searchConditions = searchParts.map(part => ({
            [Op.or]: [
                {surname: {[Op.iLike]: part}},
                {name: {[Op.iLike]: part}},
                {middleName: {[Op.iLike]: part}},
            ],
        }));
        let users = await this.userRepository.findAll({
            where: {
                [Op.and]: searchConditions
            },
            include: [
                {model: Review},
                {model: Role}
            ],
            limit: limit,
            offset: offset,
            order: [[sortField, sortType.toUpperCase()]]
        });
        return {data: users, payload: pagination};
    }

    async getUserById(userId: number): Promise<User> {
        return await this.userRepository.findByPk(userId, {include: [{model: Review}, {model: Role}]});
    }

    async addRole(userId: number, roleId: number) {
        let user = await this.getUserById(userId);
        let role = await this.roleService.getRoleById(roleId);
        if (user && role) {
            await this.userToRoleRepository.create({userId: userId, roleId: roleId});
        } else {
            throw new HttpException('Incorrect user or role id', HttpStatus.BAD_REQUEST);
        }


    }

    async updateUser(id: number, updateUserDto: UpdateUserDto) {
        let userForUpdate: User = await this.userRepository.findByPk(id);
        if (!userForUpdate)
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        let isUniqueLogin: boolean = await this.userRepository.findOne({where: {login: updateUserDto.login}}) !== null;
        if (!isUniqueLogin && updateUserDto.login !== userForUpdate.login) {
            throw new HttpException('User with current login already exist', HttpStatus.BAD_REQUEST);
        }
        let hashPassword = null;
        if (updateUserDto.password)
            hashPassword = await bcrypt.hash(updateUserDto.password, 5);

        return await userForUpdate.update({
            ...updateUserDto,
            password: (hashPassword) ? hashPassword : userForUpdate.password,
            updatedAt: new Date()
        });


    }

    async updatePassword(userId: number, updatePasswordDto: UpdatePasswordDto): Promise<User> {
        let user = await this.userRepository.findByPk(userId);
        if (!user) {
            throw new HttpException('User is not exist', HttpStatus.NOT_FOUND);
        }
        let isValidUser = await this.isValidUser(user, updatePasswordDto.password);
        if (!isValidUser)
            throw new HttpException('Incorrect password', HttpStatus.BAD_REQUEST);
        const hashPassword = await bcrypt.hash(updatePasswordDto.newPassword, 5);
        return user.update({password: hashPassword});

    }

    async updateLogin(userId: number, updateLoginDto: UpdateLoginDto): Promise<User> {
        let user = await this.userRepository.findByPk(userId);
        if (!user)
            throw new HttpException('User is not exist', HttpStatus.NOT_FOUND);
        if (user.login === updateLoginDto.newLogin) {
            throw new HttpException('User with current login is already exist', HttpStatus.BAD_REQUEST);
        }
        let isValidUser = await this.isValidUser(user, updateLoginDto.confirmPassword);
        if (!isValidUser)
            throw new HttpException('Incorrect password', HttpStatus.BAD_REQUEST);
        return user.update({login: updateLoginDto.newLogin});
    }

    async removeUser(userId: number) {
        let user = await this.userRepository.findByPk(userId);
        if (!user) {
            throw new HttpException(`User with id: ${userId} not found `, HttpStatus.NOT_FOUND);
        }
        const transaction = await this.sequelize.transaction();
        try {
            await this.userToRoleRepository.destroy({where: {userId: user.id}, transaction});
            await this.reviewService.removeByUserId(user.id, transaction);
            if (user.avatarPath !== Config.PATH.USER.DEFAULT_AVATAR)
                await this.filesService.removeFile(user.avatarPath);
            let code = await user.destroy({transaction});
            await transaction.commit();
            return code;
        } catch (e) {
            await transaction.rollback();
            throw e;
        }
    }

    async removeUserToRoleByRoleId(roleId): Promise<number> {
        return await this.userToRoleRepository.destroy({where: {roleId: roleId}});
    }

    async isValidUser(user: User, password: string): Promise<boolean> {
        return await bcrypt.compare(password, user.password);

    }

    async removeUserAvatar(userId: number) {
        let user = await this.userRepository.findByPk(userId);
        if (!user)
            throw new HttpException('Invalid user id ', HttpStatus.NOT_FOUND);
        if (user.avatarPath === Config.PATH.USER.DEFAULT_AVATAR)
            return;
        await this.filesService.removeFile(user.avatarPath);
        return await user.update({avatarPath: Config.PATH.USER.DEFAULT_AVATAR});
    }

    async removeRole(userId: number, roleId: number) {
        await this.userToRoleRepository.destroy({where: {userId: userId, roleId: roleId}});

    }
}
