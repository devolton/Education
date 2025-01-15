import {ID} from "../../../../../../_metronic/helpers";
import {Config} from "../../../../../../env.config.ts";
export enum AuthorPositionEnum{
    TRAINER='Trainer',
    JUNIOR='Junior',
    MIDDLE='Middle',
    SENIOR= 'Senior'
}

export type Author={
    id:ID,
    fullName:string,
    avatarPath:string,
    instagramHref:string,
    facebookHref:string,
    twitterHref:string,
    slogan:string,
    position:AuthorPositionEnum
}
export const initialAuthor:Author ={
    id:undefined,
    fullName:'',
    avatarPath:Config.PATH.ASSETS.BLOG.AUTHOR.DEFAULT_AVATAR,
    instagramHref:'https://www.instagram.com/',
    twitterHref:'https://x.com/',
    facebookHref:'https://uk-ua.facebook.com/',
    slogan:'Hello, im author',
    position:AuthorPositionEnum.JUNIOR
}
export type CreateAuthorDto={
    fullName:string,
    avatarPath:string,
    instagramHref:string,
    twitterHref:string,
    facebookHref:string,
    slogan:string,
    positionIndex:number
}
export type UpdateAuthorDto={
    fullName:string,
    instagramHref:string,
    twitterHref:string,
    facebookHref:string,
    slogan:string,
    positionIndex:number
}