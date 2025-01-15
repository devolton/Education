import {Module} from '@nestjs/common';
import {PostService} from './service/post.service';
import {PostController} from './post.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {PostInfo} from "./model/post.info.model";
import {Post} from "./model/post.model";
import {PostTag} from "../post-tag/model/post.tag.model";
import {PostToTag} from "./model/post.to.tag.model";
import {PostTagModule} from "../post-tag/post-tag.module";
import {PostCategoryModule} from "../post-category/post-category.module";
import {PostToCategory} from "./model/post.to.category.model";
import {JwtModule} from "@nestjs/jwt";
import {FilesModule} from "../files/files.module";
import {PaginationModule} from "../pagination/pagination.module";

@Module({
    controllers: [PostController],
    providers: [PostService, PostTagModule],
    imports: [
        PostTagModule,
        PostCategoryModule,
        JwtModule,
        SequelizeModule.forFeature([PostInfo, Post, PostTag, PostToTag,PostToCategory]),
        FilesModule,
        PaginationModule
    ]
})
export class PostModule {
}
