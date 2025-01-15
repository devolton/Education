let Config = {
    SERVER: {
        BASE_URL: 'http://localhost:3001/api',
        HOST: 'http://localhost:',
        PORT: 3001,
        URL: 'http://localhost:3001'
    },
    PATH: {
        ASSET: {
            BANNER: {
                MAIN_BANNER:'/media-assets/by-name/mainBanner',
                BECOME_INSTRUCTOR_BANNER:'/media-assets/by-name/becomeInstructorBanner',
                ABOUT_BANNER: '/media-assets/by-name/aboutBanner',
                COURSE_BANNER: '/media-assets/by-name/courseBanner',
                EVENT_BANNER: '/media-assets/by-name/eventsBanner',
                GALLERY_BANNER: '/media-assets/by-name/galleryBanner',
                CONTACT_US_BANNER: '/media-assets/by-name/contactUsBanner',
                AUTH_BANNER:'/media-assets/by-name/loginBanner'
            },
            POSTER:{
                ABOUT_POSTER:'/media-assets/by-name/aboutPoster'
            },
            LOGO:{
                MAIN_LOGO:'/media-assets/by-name/mainLogo',
            },
            GALLERY:{
                ALL_GALLERY:''
            },
            ICON:{

            }
        }
    }

}
Config = Object.freeze(Config);
export default Config;