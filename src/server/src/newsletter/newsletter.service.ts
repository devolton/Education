import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Newsletter} from "./model/newsletter.model";
import {NotFoundException} from "../exceptions/not.found.exception";

@Injectable()
export class NewsletterService {
    constructor(@InjectModel(Newsletter) private newsletterRepository:typeof Newsletter) {
    }

    async getNewsletters(offset:number,limit:number):Promise<Newsletter[]>{
        return await this.newsletterRepository.findAll({offset:offset,limit:limit});
    }
    async createNewsletter(email:string):Promise<Newsletter>{
        return await this.newsletterRepository.create({email:email});
    }
    async removeNewsletter(email:string) :Promise<number>{
        let newsletterForRemove = await this.newsletterRepository.findOne({where:{email:email}});
        if(!newsletterForRemove)
            throw new NotFoundException("Email",0);
        return await this.newsletterRepository.destroy({where:{email:email}});
    }

}
