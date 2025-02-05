import {Module} from '@nestjs/common';
import {NavigationModule} from './navigation/navigation.module';
import {OptionModule} from './option/option.module';
import {EventModule} from './event/event.module';
import {ReviewModule} from './review/review.module';
import {CourseModule} from './course/course.module';
import {FilesModule} from './files/files.module';
import {ServeStaticModule} from "@nestjs/serve-static";
import * as path from 'path';
import {SequelizeModule} from "@nestjs/sequelize";
import {Option} from "./option/model/option.model";
import {MediaAssetModule} from './media-asset/media-asset.module';
import {MediaAsset} from "./media-asset/media-asset.model";
import {UserModule} from './user/user.module';
import {Navigation} from "./navigation/model/navigation.model";
import {User} from "./user/model/user.model";
import {Review} from "./review/model/review.model";
import {Event} from "./event/model/event.model";
import EventDetail from "./event/model/eventDetail.model";
import {EventVenue} from "./event/model/eventVenue.model";
import {CourseSchedule} from "./course/model/course.schedule.model";
import {Course} from "./course/model/course.model";
import {PostModule} from './post/post.module';
import {NewsletterModule} from './newsletter/newsletter.module';
import {Newsletter} from "./newsletter/model/newsletter.model";
import { PostCategoryModule } from './post-category/post-category.module';
import {PostCategory} from "./post-category/model/post.category.model";
import { PostTagModule } from './post-tag/post-tag.module';
import {PostTag} from "./post-tag/model/post.tag.model";
import { AuthorModule } from './author/author.module';
import {Author} from "./author/model/author.mode";
import {Post} from "./post/model/post.model";
import {PostInfo} from "./post/model/post.info.model";
import {PostToTag} from "./post/model/post.to.tag.model";
import {PostToCategory} from "./post/model/post.to.category.model";
import { MessageModule } from './message/message.module';
import {Message} from "./message/model/message.model";
import { LessonModule } from './lesson/lesson.module';
import {CourseToLesson} from "./course/model/course.to.lesson.model";
import {Lesson} from "./lesson/lesson/lesson.model";
import { RoleModule } from './role/role.module';
import {UserToRole} from "./user/model/user.to.role.model";
import {Role} from "./role/model/role.model";
import { AuthModule } from './auth/auth.module';
import { CommentModule } from './comment/comment.module';
import {CommentToPost} from "./comment/model/comment.to.post.model";
import {Comment} from './comment/model/comment.model';
import {CommentToCourse} from "./comment/model/comment.to.course.model";
import {ConfigModule} from "@nestjs/config";
import { TokenModule } from './token/token.module';
import * as process from "process";
import {Token} from "./token/model/token.model";
import { PaginationModule } from './pagination/pagination.module';
import { WebsocketModule } from './websocket/websocket.module';
@Module({
    imports: [
        ConfigModule.forRoot({
         envFilePath:'.env'
        }),
        ServeStaticModule.forRoot({
            rootPath: path.resolve(__dirname,'..','src', 'static'),
            serveRoot: '/static',
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT),
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            models: [Option,
                MediaAsset,
                Navigation,
                User,
                UserToRole,
                Role,
                Review,
                EventVenue,
                Event,
                EventDetail,
                CourseSchedule,
                Course,
                CourseToLesson,
                Lesson,
                Newsletter,
            PostCategory,
            PostTag,
            Author,
            PostInfo,
            Post,
            PostToTag,
            PostToCategory,
            Message,
            Comment,
            CommentToPost,
            CommentToCourse,
            Token],
            autoLoadModels: true,
            synchronize: true
        }),
        NavigationModule,
        OptionModule,
        EventModule,
        ReviewModule,
        CourseModule,
        FilesModule,
        MediaAssetModule,
        UserModule,
        PostModule,
        NewsletterModule,
        PostCategoryModule,
        PostTagModule,
        AuthorModule,
        MessageModule,
        LessonModule,
        RoleModule,
        AuthModule,
        CommentModule,
        TokenModule,
        PaginationModule,
        WebsocketModule],
    controllers: [],
    providers: [],
})
export class AppModule {
}
