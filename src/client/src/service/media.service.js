import api from "../http/core";
import Config from '../config'

export class MediaService{

    static async getAboutPoster(){
        return await api.get(Config.PATH.ASSET.POSTER.ABOUT_POSTER);
    }
    static async getMainBanner(){
        return await api.get(Config.PATH.ASSET.BANNER.MAIN_BANNER)
    }
    static async getMainLogo(){
        return await api.get(Config.PATH.ASSET.LOGO.MAIN_LOGO)
    }
    static async getBecomeInstructorBanner(){
        return await api.get(Config.PATH.ASSET.BANNER.BECOME_INSTRUCTOR_BANNER);
    }
    static async getAboutBanner(){
        return api.get(Config.PATH.ASSET.BANNER.ABOUT_BANNER);
    }
    static async getEventBanner(){
        return api.get(Config.PATH.ASSET.BANNER.EVENT_BANNER);
    }

    static async getCourseBanner(){
        return api.get(Config.PATH.ASSET.BANNER.COURSE_BANNER);
    }
    static async getContactUsBanner(){
        return api.get(Config.PATH.ASSET.BANNER.CONTACT_US_BANNER);
    }
    static async getGalleryBanner(){
        return api.get(Config.PATH.ASSET.BANNER.GALLERY_BANNER);
    }
    static async getAuthBanner(){
        return api.get(Config.PATH.ASSET.BANNER.AUTH_BANNER);
    }


}