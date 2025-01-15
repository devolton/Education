import {Module} from '@nestjs/common';
import {ReviewService} from './review.service';
import {ReviewController} from './review.controller';
import {FilesModule} from "../files/files.module";
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "../user/model/user.model";
import {Review} from "./model/review.model";
import {JwtModule} from "@nestjs/jwt";
import {PaginationModule} from "../pagination/pagination.module";

@Module({
    controllers: [ReviewController],
    providers: [ReviewService],
    imports: [FilesModule,
        SequelizeModule.forFeature([Review, User]),
        JwtModule,
        PaginationModule
    ],
    exports: [ReviewService]
})
export class ReviewModule {
}
