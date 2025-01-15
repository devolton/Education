import { Module } from '@nestjs/common';
import { MediaAssetService } from './service/media-asset.service';
import { MediaAssetController } from './media-asset.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {MediaAsset} from "./media-asset.model";
import {FilesModule} from "../files/files.module";
import {PaginationModule} from "../pagination/pagination.module";
import {JwtModule} from "@nestjs/jwt";

@Module({
  controllers: [MediaAssetController],
  providers: [MediaAssetService],
  imports:[
      SequelizeModule.forFeature([MediaAsset]),
      JwtModule,
      FilesModule,
      PaginationModule
  ]
})
export class MediaAssetModule {}
