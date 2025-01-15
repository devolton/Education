import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {MediaAsset} from "../media-asset.model";
import {UpdateMediaAssetDto} from "../dto/update.media.asset.dto";
import {Config} from "../../Config";
import {MediaAssetCategoryEnum} from "../common/media.asset.category.enum";
import {PaginationService} from "../../pagination/pagination.service";
import {FilesService} from "../../files/files.service";
import {Op} from "sequelize";
import {async} from "rxjs";
import {NotFoundException} from "../../exceptions/not.found.exception";

@Injectable()
export class MediaAssetService {
    constructor(@InjectModel(MediaAsset) private mediaAssetsRepository: typeof MediaAsset,
                private paginationService: PaginationService,
                private fileService: FilesService) {
    }

    async getMediaAssetById(id: number) {
        return this.mediaAssetsRepository.findByPk(id);
    }


    async updateMediaAsset(id: number, updateMediaAssetDto: UpdateMediaAssetDto) {
        let mediaForUpdate = await this.mediaAssetsRepository.findByPk(id);
        if (!mediaForUpdate)
            throw new NotFoundException('Media-asset',id);
        return await mediaForUpdate.update(updateMediaAssetDto);
    }

    async updateImage(id: number, image: Express.Multer.File) {
        let mediaAssetForUpdate = await this.mediaAssetsRepository.findByPk(id);
        if (!mediaAssetForUpdate)
            throw new NotFoundException('Media-asset',id);
        let category = this.getEnumValue(MediaAssetCategoryEnum, mediaAssetForUpdate.category);
        let pathToFolder = await this.fromEnumToFolderPath(category);
        let updatedPath = await this.fileService.createFile(image, String(mediaAssetForUpdate.id), pathToFolder);
        return await mediaAssetForUpdate.update({path: updatedPath});
    }

    async getMediaAssetByName(name: string): Promise<MediaAsset> {
        return this.mediaAssetsRepository.findOne({where: {name: name}});
    }

    async getAllMediaAssets(page:number=1, itemsPerPage:number =5, sortField:string='id',sortType:string='asc', query:string='') {
        let count = await this.mediaAssetsRepository.count({
            where:{
                name:{[Op.iLike]:`${query}%`}
            }
        });
        let pagination = await this.paginationService.createNavigation(page,itemsPerPage,count);
        let offset = (page-1) * itemsPerPage;
        let assets = await this.mediaAssetsRepository.findAll({
            where:{
                name:{[Op.iLike]:`${query}%`}
            },
            limit:itemsPerPage,
            offset:offset,
            order:[[sortField,sortType.toUpperCase()]]
        })
        return {data:assets,payload:pagination};



    }

    async removeImage(id: number) {
        let mediaAsset = await this.mediaAssetsRepository.findByPk(id);
        if(!mediaAsset)
            throw new NotFoundException("Media-asset",id);
        let category = this.getEnumValue(MediaAssetCategoryEnum, mediaAsset.category);
        let defaultPath = await this.fromEnumToDefaultPath(category);
        if(mediaAsset.path===defaultPath)
            return;
        await this.fileService.removeFile(mediaAsset.path);
        return await mediaAsset.update({path:defaultPath});

    }

    private async fromEnumToFolderPath(mediaCategory: MediaAssetCategoryEnum) {
        switch (mediaCategory) {
            case MediaAssetCategoryEnum.BANNER:
                return Config.PATH.PAGE_ASSET.BANNER_FOLDER;
            case MediaAssetCategoryEnum.POSTER:
                return Config.PATH.PAGE_ASSET.POSTER_FOLDER;
            case MediaAssetCategoryEnum.ICON:
                return Config.PATH.PAGE_ASSET.ICON_FOLDER;
            case MediaAssetCategoryEnum.LOGO:
                return Config.PATH.PAGE_ASSET.LOGO_FOLDER;
            case MediaAssetCategoryEnum.GALLERY:
                return Config.PATH.PAGE_ASSET.GALLERY_FOLDER;
            default:
                return Config.PATH.PAGE_ASSET.POSTER_FOLDER;
        }
    }
    private async fromEnumToDefaultPath(mediaCategory: MediaAssetCategoryEnum) {
        switch (mediaCategory) {
            case MediaAssetCategoryEnum.BANNER:
                return Config.PATH.PAGE_ASSET.BANNER_DEFAULT;
            case MediaAssetCategoryEnum.POSTER:
                return Config.PATH.PAGE_ASSET.POSTER_DEFAULT;
            case MediaAssetCategoryEnum.ICON:
                return Config.PATH.PAGE_ASSET.ICON_DEFAULT;
            case MediaAssetCategoryEnum.LOGO:
                return Config.PATH.PAGE_ASSET.LOGO_DEFAULT;
            case MediaAssetCategoryEnum.GALLERY:
                return Config.PATH.PAGE_ASSET.GALLERY_DEFAULT;
            default:
                return Config.PATH.PAGE_ASSET.POSTER_DEFAULT;
        }
    }

    private getEnumValue<T>(enumObj: T, value: string | number): T[keyof T] | undefined {
        const values = Object.values(enumObj) as (string | number)[];
        return values.includes(value) ? (value as T[keyof T]) : undefined;
    }
}
