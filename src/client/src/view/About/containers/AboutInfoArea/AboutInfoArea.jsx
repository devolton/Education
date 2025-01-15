import Config from '../../../../config';
import AboutPosterBlock from "../../components/AboutPosterBlock/AboutPosterBlock";
import {useEffect, useState} from "react";
import AboutDescriptionBlock from "../../components/AboutDescriptionBlock/AboutDescriptionBlock";
import {MediaService} from "../../../../service/media.service";
import Loading from "../../../Common/components/Loading/Loading";

export default function AboutInfoArea() {
    const [posterObj, setPosterObj] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        MediaService.getAboutPoster()
            .then((res) => {
                setPosterObj(res.data);
                setIsLoaded(true);
            }).catch((err) => {
            console.log(err);
        })

    }, [])
    if (!isLoaded) {
        return (<Loading/>)
    } else {
        return (
            <section className="info-area pb-120">
                <div className="container-fluid">
                    <div className="row align-items-center">
                        <AboutPosterBlock posterObj={posterObj}/>
                       <AboutDescriptionBlock/>
                    </div>
                </div>
            </section>
        );
    }
}