import {useEffect, useRef, useState} from "react";
import Config from '../../../../config';
import BlogBannerPost from "../../components/BlogBannerPost/BlogBannerPost";

export default function BlogBannerContainer({post}) {
    const bannerRef = useRef(null);
    useEffect(() => {
        if (bannerRef.current) {
            bannerRef.current.style.background = `url('${Config.SERVER.URL + post.posterPath}')`
            bannerRef.current.style.backgroundSize = 'cover';

        }
    }, []);

        return (
            <section ref={bannerRef} className="banner-area relative blog-home-banner" id="home">
                <div className="overlay overlay-bg"></div>
                <div className="container">
                    <BlogBannerPost post={post}/>
                </div>
            </section>
        );
}