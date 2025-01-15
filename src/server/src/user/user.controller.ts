import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put, Query,
    Req, UploadedFile,
    UseGuards,
    UseInterceptors,
    UsePipes
} from '@nestjs/common';
import {UserService} from './service/user.service';
import {User} from "./model/user.model";
import {CreateUserDto} from "./dto/create.user.dto";
import {Roles} from "../decorators/roles.auth.decorator";
import {RoleGuard} from "../token/guard/role.guard";
import {ValidationPipe} from "../pipes/validation.pipe";
import {UpdateUserDto} from "./dto/update.user.dto";
import {ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags} from "@nestjs/swagger";
import {NUMBER} from "sequelize";
import {JwtAuthGuard} from "../token/guard/jwt.auth.guard";
import {Express} from "express";
import {AddUserIdInterceptor} from "../interceptors/add.user.id.interceptor";
import {Request} from "express";
import {FileInterceptor} from "@nestjs/platform-express";
import {UpdatePasswordDto} from "./dto/update.password.dto";
import {UpdateLoginDto} from "./dto/update.login.dto";

@ApiTags('Users')
@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    @ApiOperation({summary: 'Getting all users'})
    @ApiResponse({status: 200, type: [User]})
    @Get()
    @UseGuards(JwtAuthGuard)
    @Roles("admin")
    @UseGuards(RoleGuard)
    async getAllUsers(@Query('items_per_page') itemsPrePage:number,
                      @Query('page')page:number,
                      @Query('sort') sortField:string,
                      @Query('order') sortType:string,
                      @Query('search') search:string) {
        return await this.userService.getAllUsers(page,itemsPrePage,sortField,sortType,search);

    }

    @UseInterceptors(AddUserIdInterceptor)
    @Get('/auth')
    async getUser(@Req() req:Request) {
        let userId:number = req.body.userId;
       return await this.userService.getUserById(userId);


    }
    @ApiOperation({summary: 'Getting user by login'})
    @ApiResponse({status: 200, type: User})
    @Get('/byLogin')
    async getUserByLogin(@Body('login') login: string): Promise<User> {
        return await this.userService.getUserByLogin(login);
    }
    @Get('/:id')
    async getUserById(@Param('id') id:number):Promise<User>{
        return await this.userService.getUserById(id);
    }

    @Roles("admin")
    @UseGuards(RoleGuard)
    @ApiOperation({summary: 'Creating user'})
    @ApiResponse({status: 200, type: User})
    @UseInterceptors(FileInterceptor('avatar'))
    @Post()
    async createUser(@Body('user') userDto: CreateUserDto,
                     @UploadedFile() avatar): Promise<User> {
        console.log(userDto);
        return await this.userService.createUser(userDto,avatar);
    }
    @UseInterceptors(FileInterceptor('avatar'))
    @Put('/avatar/:id')
    async updateUserAvatar( @UploadedFile() avatar,
                            @Param('id') userId:number){
        return await this.userService.updateUserAvatar(userId,avatar);
    }


    @Roles("admin")
    @UseGuards(RoleGuard)
    @ApiOperation({summary: 'Adding role to user'})
    @ApiResponse({status: 200})
    @Post('/role/:id')
    async addRole(@Param('id') userId:number,
                  @Body('roleId') roleId: number) {
        return await this.userService.addRole(userId, roleId);

    }
    @Put('/password/:id')
    async updatePassword(@Body('upPassword')updatePasswordDto:UpdatePasswordDto,
                         @Param('id') id:number):Promise<User>{
        console.warn(updatePasswordDto);
        return this.userService.updatePassword(id,updatePasswordDto)

    }
    @Put('/login/:id')
    async updateLogin(@Body('upLogin') updateLoginDto:UpdateLoginDto,
                      @Param('id') id:number):Promise<User>{
        return this.userService.updateLogin(id,updateLoginDto);
    }
    @Put('/role/:id')
    async removeRole(@Param('id') userId:number,
                     @Body('roleId') roleId:number){
        return await this.userService.removeRole(userId,roleId);
    }

    @ApiOperation({summary: 'Update user by id'})
    @ApiResponse({status: 200, type: NUMBER})
    @ApiParam({name: 'id', description: 'User ID of we want to update', example: 1})
    @Put('/:id')
    async updateUser(@Param('id') id: number,
                     @Body('user') updateUserDto: UpdateUserDto) {
        return await this.userService.updateUser(id, updateUserDto);
    }

    @ApiOperation({summary: 'Removing user by id'})
    @ApiResponse({status: 200, type: NUMBER})
    @Roles("admin")
    @UseGuards(RoleGuard)
    @Delete('/:id')
    async removeUser(@Param('id') userId: number) {
        return await this.userService.removeUser(userId)
    }
    @Delete('/avatar/:id')
    async removeUserAvatar(@Param('id') userId){
        return await this.userService.removeUserAvatar(userId);
    }
}
