import './HeaderContainer.css';
import {useEffect, useState} from "react";
import NavItem from "../../components/NavItem/NavItem";
import {Link} from "react-router-dom";
import SocialMediaItem from "../../components/SocialMediaItem/SocialMediaItem";
import HeaderTop from "../../components/HeaderTop/HeaderTop";
import HeaderMain from "../../components/HeaderMain/HeaderMain";

export default function HeaderContainer() {
    const [isScrolled, setIsScrolled] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    return (
        <header id="header" className={isScrolled ? 'header-scrolled' : ''}>
            <HeaderTop/>
            <HeaderMain/>
        </header>

    )
}