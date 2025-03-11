import * as path from 'path'
 let Config = {
    URL:{
        CLIENT_URL:'http://localhost:3000',
        ADMIN_URL:'http://localhost:5173',
        REMOTE_ADMIN_URL:'http://192.168.0.111:5173'
    },
    PATH: {
        USER: {
            AVATAR_FOLDER: '/static/user/avatar/',
            DEFAULT_AVATAR:'/static/user/avatar/defaultAvatar.png'
        },
        BLOG: {
            CATEGORY: {
                THUMBNAILS_FOLDER: '/static/blog/categories/thumbnails/',
                DEFAULT_THUMBNAIL:'/static/blog/categories/thumbnails/categoryDefault.png'
            },
            POST:{
                POSTER_FOLDER:'/static/blog/post/poster/',
                THUMBNAIL_FOLDER:'/static/blog/post/thumbnail/',
                DEFAULT_POSTER:'/static/blog/post/poster/postDefaultPoster.png',
                DEFAULT_THUMBNAIL:'/static/blog/post/thumbnail/postDefaultThumbnail.png'
            },
            AUTHOR:{
                AVATAR_FOLDER:'/static/blog/author/avatar/',
                DEFAULT_AVATAR:'/static/blog/author/avatar/authorDefaultAvatar.png'
            }
        },
        EVENT:{
            THUMBNAIL_FOLDER:'/static/event/thumbnail/',
            POSTER_FOLDER:'/static/event/poster/',
            DEFAULT_THUMBNAIL:'/static/event/thumbnail/eventDefaultThumbnail.jpg',
            DEFAULT_POSTER: '/static/event/poster/eventDefaultPoster.jpg'
        },
        COURSE:{
            THUMBNAIL_FOLDER:'/static/course/thumbnail/',
            POSTER_FOLDER:'/static/course/poster',
            DEFAULT_THUMBNAIL:'/static/course/thumbnail/courseThumbnailDefault.jpeg',
            DEFAULT_POSTER:'/static/course/poster/coursePosterDefault.jpg'
        },
        PAGE_ASSET:{
            BANNER_FOLDER:'/static/asset/banner/',
            ICON_FOLDER:'/static/asset/icon/',
            LOGO_FOLDER:'/static/asset/logo/',
            POSTER_FOLDER:'/static/asset/poster/',
            GALLERY_FOLDER:'/static/asset/gallery/',
            GALLERY_DEFAULT:'',
            BANNER_DEFAULT:'',
            ICON_DEFAULT:'',
            LOGO_DEFAULT:'',
            POSTER_DEFAULT:''
        }
    }
}
Config = Object.freeze(Config);
export  {Config};
