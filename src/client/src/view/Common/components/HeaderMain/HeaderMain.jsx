import {Link} from "react-router-dom";
import Config from '../../../../config';
import {useEffect, useState} from "react";
import HeaderNavContainer from "../../containers/HeaderNavContainer/HeaderNavContainer";
import HeaderLogoBlock from "../HeaderLogoBlock/HeaderLogoBlock";
import {MediaService} from "../../../../service/media.service";
import {NavigationService} from "../../../../service/navigation.service"

export default function HeaderMain() {
    const [navigations, setNavigation] = useState([]);
    const [logoObj, setLogoObj] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        NavigationService.getNavigations()
            .then((res) => {
                setNavigation(res.data);

            }).catch(err => {
            console.log(err);
        });
        MediaService.getMainLogo()
            .then(res => {
                setLogoObj(res.data);
                setIsLoaded(true);

            }).catch((err) => {
            console.log(err);
        })

    }, [])
    if (!isLoaded) {
        return (<h1>Is loading...</h1>)
    } else {
        return (<div className="container main-menu">
            <div className="row align-items-center justify-content-between d-flex">
                <HeaderLogoBlock logoObj={logoObj}/>
                <HeaderNavContainer navigations={navigations}/>

            </div>
        </div>)
    }
}