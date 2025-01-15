import {useEffect, useRef} from "react";
import Config from '../../../../config';
import {Link} from "react-router-dom";

export  default function SmallBannerArea({currentPageName,imagePath}){
    const bannerRef = useRef();
    useEffect(()=>{
        if(bannerRef.current){
            bannerRef.current.style.background=`url('${Config.SERVER.URL+((imagePath)?imagePath : '/static/asset/banner/eventBanner.png')}') top no-repeat`;
            bannerRef.current.style.backgroundSize='cover';
        }


    },[]);

    return (
        <section ref={bannerRef} className="banner-area relative about-banner" id="home">
            <div className="overlay overlay-bg"></div>
            <div className="container">
                <div className="row d-flex align-items-center justify-content-center">
                    <div className="about-content col-lg-12">
                        <h1 className="text-white">
                            {currentPageName}
                        </h1>
                        <p className="text-white link-nav"><Link to={'/'}>Home </Link> <span
                            className="lnr lnr-arrow-right"></span> <a> {currentPageName}</a></p>
                    </div>
                </div>
            </div>
        </section>
    );
}