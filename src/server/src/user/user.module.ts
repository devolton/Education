import {forwardRef, Module} from '@nestjs/common';
import {UserService} from './service/user.service';
import {UserController} from './user.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "./model/user.model";
import {Review} from "../review/model/review.model";
import {UserToRole} from "./model/user.to.role.model";
import {AuthModule} from "../auth/auth.module";
import {RoleModule} from "../role/role.module";
import {ReviewModule} from "../review/review.module";
import {Role} from "../role/model/role.model";
import {TokenModule} from "../token/token.module";
import {JwtModule, JwtService} from "@nestjs/jwt";
import {FilesModule} from "../files/files.module";
import {PaginationModule} from "../pagination/pagination.module";
import {WebsocketModule} from "../websocket/websocket.module";

@Module({
    controllers: [UserController],
    providers: [UserService],
    imports: [
        SequelizeModule.forFeature([User, Review, UserToRole,Role]),
        forwardRef(() => AuthModule),
        forwardRef(() => RoleModule),
        forwardRef(() => WebsocketModule),
        JwtModule,
        ReviewModule,
        FilesModule,
        PaginationModule
    ],
    exports: [UserService]
})
export class UserModule {
}
