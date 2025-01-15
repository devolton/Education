
import './PageNotFoundMain.css';
import {useEffect, useState} from "react";
import {CircularProgress} from "@mui/material";
import Box from "@mui/material/Box";
export default function PageNotFoundMain(){
    const [windowHeight, setWindowHeight] = useState(window.innerHeight);
    const [headerHeight, setHeaderHeight] = useState(0);
    const [fitscreenHeight, setFitscreenHeight] = useState(0);

    useEffect(() => {
        // Функция для обновления высоты окна и элементов
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
        <section className="page-not-found" id="home">
            <div className="container">
                <div className="row fullscreen d-flex align-items-center justify-content-center">
                    <h1>Page not found!</h1>
                </div>
            </div>
        </section>
    );
}