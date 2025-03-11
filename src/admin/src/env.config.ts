const BASE_URL = 'http://localhost:3001'
//const BASE_URL="http://192.168.0.111:3001";

let Config = {
    PATH: {
        SERVER: {
            BASE_URL: BASE_URL,
            POSTS_URL: BASE_URL + '/api/posts',
            NAVIGATIONS_URL: BASE_URL + '/api/navigations',
            MESSAGES_URL: BASE_URL + '/api/messages',
            EVENTS_URL: BASE_URL + '/api/events',
            COURSES_URL: BASE_URL + '/api/courses',
            REVIEWS_URL: BASE_URL + '/api/reviews',
            AUTHORS_URL: BASE_URL + '/api/authors',
            MEDIA_ASSETS_URL: BASE_URL + '/api/media-assets',
            CHAT_URL: BASE_URL + '/api/chats',
            CHAT_GATEWAY_URL: BASE_URL + '/chat',
            VIDEO_CHAT_GATEWAY_URL: BASE_URL + '/video-chat',
        },
        ASSETS: {
            USER: {
                DEFAULT_AVATAR: '/static/user/avatar/defaultAvatar.png'
            },
            CAMERA:{
                DISABLE_CAMERA_ICON:'/static/asset/camera/disable_camera.webp',
                MICROPHONE_ON: '/static/asset/camera/microOn.png',
                MICROPHONE_OFF: '/static/asset/camera/microOff.png',
                CAMERA_OFF: '/static/asset/camera/cameraOff.png',
                CAMERA_ON: '/static/asset/camera/cameraOn.png',
                CALLING_ICON: '/static/asset/camera/calling.webp',
            },
            MEDIA_ASSET: {
                DEFAULT_MEDIA_ASSET: '/static/asset/poster/defaultPoster.jpg'
            },
            BLOG: {
                CATEGORY: {
                    DEFAULT_THUMBNAIL: '/static/blog/categories/thumbnails/categoryDefault.png'
                },
                POST: {
                    DEFAULT_POSTER: '/static/blog/post/poster/postDefaultPoster.png',
                    DEFAULT_THUMBNAIL: '/static/blog/post/thumbnail/postDefaultThumbnail.png'
                },
                AUTHOR: {
                    DEFAULT_AVATAR: '/static/blog/author/avatar/authorDefaultAvatar.png'
                }
            },
            EVENT: {
                DEFAULT_THUMBNAIL: '/static/event/thumbnail/eventDefaultThumbnail.jpg',
                DEFAULT_POSTER: '/static/event/poster/eventDefaultPoster.jpg'
            },
            COURSE: {
                DEFAULT_THUMBNAIL: '/static/course/thumbnail/courseThumbnailDefault.jpg',
                DEFAULT_POSTER: '/static/course/poster/coursePosterDefault.jpeg'
            }
        }
    }
    ,
    KEYS: {
        CITIES_API_KEY: 'EEzHK4rk9XcUcMqXqBzB7w==p4thMQi4pq5t1vHX'
    }
}
Config = Object.freeze(Config);
export {Config}