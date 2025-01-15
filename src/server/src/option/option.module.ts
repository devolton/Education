import { Module } from '@nestjs/common';
import { OptionService } from './option.service';
import { OptionController } from './option.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {Option} from './model/option.model';
import {JwtModule} from "@nestjs/jwt";
import {UserModule} from "../user/user.module";
import {PaginationModule} from "../pagination/pagination.module";

@Module({
  controllers: [OptionController],
  providers: [OptionService],
  imports:[
      SequelizeModule.forFeature([Option]),
      JwtModule,
      PaginationModule
  ],
    exports:[OptionService]
})
export class OptionModule {}
