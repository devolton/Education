import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query, UploadedFile,
    UseGuards,
    UseInterceptors,
    UsePipes
} from '@nestjs/common';
import {CourseService} from './service/course.service';
import {Course} from "./model/course.model";
import {CreateCourseDto} from "./dto/create.course.dto";
import {CreateCourseScheduleDto} from "./dto/create.course.schedule.dto";
import {ValidationPipe} from "../pipes/validation.pipe";
import {Roles} from "../decorators/roles.auth.decorator";
import {RoleGuard} from "../token/guard/role.guard";
import {UpdateCourseDto} from "./dto/update.course.dto";
import {UpdateCourseScheduleDto} from "./dto/update.course.schedule.dto";
import {FileInterceptor} from "@nestjs/platform-express";

@Controller('courses')
export class CourseController {
    constructor(private readonly courseService: CourseService) {
    }

    @Get()
    async getCourses(@Query('offset') offset: number,
                     @Query('limit') limit: number): Promise<Course[]> {
        return await this.courseService.getCourses(offset, limit);
    }

    @Get('/admin')
    async getCoursesAndPagination(@Query('page') page: number,
                                  @Query('items_per_page') itemPerPage: number,
                                  @Query('sort') sortField: string,
                                  @Query('order') sortType: string,
                                  @Query('search') query: string){
        return await this.courseService.getCoursesAndPagination(page,itemPerPage,sortField,sortType,query);
    }

    @Get('/random')
    async getRandomCourses(@Query('limit') limit: number) {
        return await this.courseService.getRandomCourses(limit);
    }

    @Get('/:slug')
    async getCourseBySlug(@Param('slug') slug: string): Promise<Course> {
        return await this.courseService.getCourseBySlug(slug);
    }
    @Roles('admin')
    @UseGuards(RoleGuard)
    @Get('/by-id/:id')
    async getCourseById(@Param('id') id:number):Promise<Course>{
        return await this.courseService.getCourseById(id);
    }

    @UsePipes(ValidationPipe)
    @Roles('admin')
    @UseGuards(RoleGuard)
    @Post()
    async createCourse(@Body('course') courseDto: CreateCourseDto,
                       @Body('course_schedule') courseScheduleDto: CreateCourseScheduleDto) {
        return await this.courseService.createCourse(courseDto, courseScheduleDto);

    }

    @Roles('admin')
    @UseGuards(RoleGuard)
    @Put('/:id')
    async updateCourse(@Param('id') courseId: number,
                       @Body('course') updateCourseDto: UpdateCourseDto,
                       @Body('course_schedule') updateCourseScheduleDto: UpdateCourseScheduleDto) {
        return await this.courseService.updateCourse(courseId, updateCourseDto, updateCourseScheduleDto);
    }
    @Roles('admin')
    @UseGuards(RoleGuard)
    @UseInterceptors(FileInterceptor('thumbnail'))
    @Delete('/thumbnail/:id')
    async updateThumbnail(@Param('id') courseId:number,
                          @UploadedFile() thumbnail:Express.Multer.File){
        return await this.courseService.updateThumbnail(courseId,thumbnail);
    }

    @Roles('admin')
    @UseGuards(RoleGuard)
    @UseInterceptors(FileInterceptor('poster'))
    @Delete('/poster/:id')
    async updatePoster(@Param('id') courseId:number,
                          @UploadedFile() poster:Express.Multer.File){
        return await this.courseService.updatePoster(courseId,poster);
    }

    @Roles('admin')
    @UseGuards(RoleGuard)
    @Delete('/:id')
    async deleteCourse(@Param('id') courseId: number): Promise<void> {
        return await this.courseService.removeCourse(courseId);
    }
    @Roles('admin')
    @UseGuards(RoleGuard)
    @Delete('/thumbnail/:id')
    async deleteThumbnail(@Param('id') courseId:number){
        return await this.courseService.removeThumbnail(courseId);
    }
    @Roles('admin')
    @UseGuards(RoleGuard)
    @Delete('/poster/:id')
    async deletePoster(@Param('id') courseId:number){
        return await this.courseService.removePoster(courseId);
    }
}
