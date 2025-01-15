import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { MediaAssetService } from './service/media-asset.service';
import {MediaAsset} from "./media-asset.model";
import {RoleGuard} from "../token/guard/role.guard";
import {Roles} from "../decorators/roles.auth.decorator";
import {UpdateMediaAssetDto} from "./dto/update.media.asset.dto";
import {FileInterceptor} from "@nestjs/platform-express";

@Controller('media-assets')
export class MediaAssetController {
  constructor(private readonly mediaAssetService: MediaAssetService) {}

  @Roles('admin')
  @UseGuards(RoleGuard)
  @Get()
  async getAllMediaAssets(@Query('items_per_page') itemsPrePage: number,
                          @Query('page') page: number,
                          @Query('sort') sortField: string,
                          @Query('order') sortType: string,
                          @Query('search') search: string){
     return await this.mediaAssetService.getAllMediaAssets(page,itemsPrePage,sortField,sortType,search);
  }
  @Get('/:id')
  async getMediaAssetById(@Param('id') id:number) {
    return await this.mediaAssetService.getMediaAssetById(id);
  }

  @Get('/by-name/:name')
  async getMediaAssetByName(@Param('name') name:string) :Promise<MediaAsset>{
    return await this.mediaAssetService.getMediaAssetByName(name);
  }
  @Roles('admin')
  @UseGuards(RoleGuard)
  @Put('/:id')
  async updateMediaAsset(@Param('id') id:number,
                        @Body('media_asset') updateDto:UpdateMediaAssetDto){
    return await this.mediaAssetService.updateMediaAsset(id,updateDto);
  }
  @Roles('admin')
  @UseGuards(RoleGuard)
  @UseInterceptors(FileInterceptor('image'))
  @Put('/image/:id')
  async updateMediaAssetImage(@Param('id') id:number,
                         @UploadedFile() image:Express.Multer.File){
    return await this.mediaAssetService.updateImage(id,image);
  }

  @Roles('admin')
  @UseGuards(RoleGuard)
  @Delete('/image/:id')
  async removeMediaAssetImage(@Param('id')id:number){
    return await this.mediaAssetService.removeImage(id);
  }


}
