import Config from '../../../../config';
import './BannerArea.css';
import {useEffect, useState, useRef} from "react";
import {Link} from "react-router-dom";
import {MediaService} from "../../../../service/media.service";
export default function BannerArea(){
    const bannerAreaRef = useRef(null);
    const [windowHeight, setWindowHeight] = useState(window.innerHeight);
    const [headerHeight, setHeaderHeight] = useState(0);
    const [fitscreenHeight, setFitscreenHeight] = useState(0);

    useEffect(() => {
            MediaService.getMainBanner()
                .then((res)=>{
                    bannerAreaRef.current.style.background=`url('${Config.SERVER.URL+res.data.path}') right`;
                    bannerAreaRef.current.style.backgroundSize='cover';

                }).catch((err)=>{
                    console.log(err);
            })



        const updateHeights = () => {
            const headerElement  = document.querySelector(".default-header");
            const headerHeight = headerElement?.offsetHeight || 0;

            setWindowHeight(window.innerHeight);
            setHeaderHeight(headerHeight);
            setFitscreenHeight(window.innerHeight - headerHeight);

            // Устанавливаем высоты для fullscreen элементов
            const fullscreenElements = document.querySelectorAll(".fullscreen");
            fullscreenElements.forEach((el) => {
                el.style.height = `${window.innerHeight}px`;
            });

            // Устанавливаем высоты для fitscreen элементов
            const fitscreenElements = document.querySelectorAll(".fitscreen");
            fitscreenElements.forEach((el) => {
                el.style.height = `${window.innerHeight - headerHeight}px`;
            });
        };

        // Обновляем размеры при изменении размера окна
        window.addEventListener('resize', updateHeights);

        // Вызываем один раз для начальных значений
        updateHeights();

        // Очищаем слушатель при размонтировании компонента
        return () => {
            window.removeEventListener('resize', updateHeights);
        };
    }, []);

    return (
        <section ref={bannerAreaRef} className="banner-area relative" id="home">
            <div className="overlay overlay-bg"></div>
            <div className="container">
                <div className="row fullscreen d-flex align-items-center justify-content-between">
                    <div className="banner-content col-lg-9 col-md-12">
                        <h1 className="text-uppercase">
                            We Ensure better education
                            for a better world
                        </h1>
                        <p className="pt-10 pb-10">
                            In the history of modern astronomy, there is probably no one greater leap forward than the
                            building and launch of the space telescope known as the Hubble.
                        </p>
                        <Link to={'/contact'} className="primary-btn text-uppercase">Get Started</Link>
                    </div>
                </div>
            </div>
        </section>
    )
}