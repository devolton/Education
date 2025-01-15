import {Body, Controller, Delete, Get, Param, Post, Query, UseGuards} from '@nestjs/common';
import {NewsletterService} from './newsletter.service';
import {Newsletter} from "./model/newsletter.model";
import {Roles} from "../decorators/roles.auth.decorator";
import {RoleGuard} from "../token/guard/role.guard";

@Controller('newsletters')
export class NewsletterController {
    constructor(private readonly newsletterService: NewsletterService) {
    }
    @Roles('admin')
    @UseGuards(RoleGuard)
    @Get()
    async getNewsletters(@Query('limit') limit: number,
                         @Query('offset') offset: number): Promise<Newsletter[]> {
        return await this.newsletterService.getNewsletters(offset, limit);
    }

    @Post()
    async createNewsletter(@Body('email') email:string ):Promise<Newsletter>{
        return await this.newsletterService.createNewsletter(email);
    }
    @Roles('admin')
    @UseGuards(RoleGuard)
    @Delete('/:email')
    async deleteNewsletter(@Param('email') email:string):Promise<number>{
        return await this.newsletterService.removeNewsletter(email);
    }
}
