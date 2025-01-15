import {forwardRef, Module} from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {Role} from "./model/role.model";
import {JwtModule} from "@nestjs/jwt";
import {UserModule} from "../user/user.module";
import {UserToRole} from "../user/model/user.to.role.model";
import {User} from "../user/model/user.model";
import {PaginationModule} from "../pagination/pagination.module";

@Module({
  controllers: [RoleController],
  providers: [RoleService],
  imports:[
      SequelizeModule.forFeature([Role, UserToRole]),
      forwardRef(()=>UserModule),
      PaginationModule,
      JwtModule
  ],
    exports:[RoleService]
})
export class RoleModule {}
