import {PagItemBackgroundChanger} from "./PagItemBackgroundChanger";
import {PostService} from "../service/post.service";

export class PostFetchService {
    static #pagRefsCollection = [];
    static activePageNum = 1;
    static pageCount = 0;
    static category = '';
    static tag = '';
    static query = '';
    static limit = 2;
    static offset = 0;
    static refreshPostsHook;
    static refreshPaginationHook;

    static refresh() {
        PostService.getFilteredPostRange()
            .then((res) => {
                let data = res.data;
                this.refreshPostsHook(data.posts);
                this.pageCount = data.pageCount;
                this.refreshPaginationHook(this.initPaginationCollection());
            }).catch((err) => {
            console.log(err);
        })
    }

    static pushPagRef(pagNum, pagRef) {
        this.#pagRefsCollection.push({order: pagNum, ref: pagRef});
    }

    static setActivePage(pagRef, pageNum) {
        this.activePageNum = pageNum;
        this.offset = (this.activePageNum - 1) * this.limit;
        PagItemBackgroundChanger.setActiveBackground(pagRef);
        this.refresh();
    }

    static initPaginationCollection() {
        let tempPagObjCollection = [];
        for (let i = 1; i <= this.pageCount; i++) {
            tempPagObjCollection.push({order: i});
        }
        return tempPagObjCollection;
    }

    static incrementActivePage() {
        if (this.activePageNum < this.pageCount) {
            this.activePageNum++;
            this.offset = (this.activePageNum - 1) * this.limit;
            PagItemBackgroundChanger.setActiveBackground(this.#pagRefsCollection.find((onePag) => {
                return onePag.order === this.activePageNum
            }).ref);
            this.refresh();
        }

    }

    static decrementActivePage() {
        if (this.activePageNum > 1) {
            this.activePageNum--;
            this.offset = (this.activePageNum - 1) * this.limit;
            PagItemBackgroundChanger.setActiveBackground(this.#pagRefsCollection.find((onePag) => {
                return onePag.order === this.activePageNum
            }).ref)
            this.refresh();
        }
    }
}