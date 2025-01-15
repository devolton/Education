import { Injectable } from '@nestjs/common';

@Injectable()
export class PaginationService {
    constructor() {
    }

    async createNavigation(currentPagNum: number, limit: number, entityCount: number) {
        let linksArr = [];
        let pageCount = Math.ceil(entityCount / limit);
        linksArr.push({
            label: "&laquo; Previous",
            page: (currentPagNum == 1) ? null : (currentPagNum - 1),
            active: false,
            url: (currentPagNum == 1) ? null : `/?page=${(currentPagNum - 1)}`
        })
        for (let i = 1; i <= pageCount; i++) {
            let oneLink = {
                label: i.toString(),
                page: i,
                active: i == currentPagNum,
                url: `/?page=${i}`
            }
            linksArr.push(oneLink)
        }
        linksArr.push({
            label:"Next &raquo;",
            page:(currentPagNum==linksArr.length)?null : (currentPagNum+1),
            active:false,
            url:(currentPagNum==linksArr.length)?null : `/?page=${currentPagNum+1}`

        })


        return {pagination:{
                page: currentPagNum,
                items_per_page:limit,
                links:linksArr
            }}


    }

}
