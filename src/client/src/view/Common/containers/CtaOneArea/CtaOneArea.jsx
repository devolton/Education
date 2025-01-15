import {useEffect, useRef} from "react";
import Config from '../../../../config';
import {MediaService} from "../../../../service/media.service";
import {Link} from "react-router-dom";

export default function CtaOneArea() {
    const ctaOneArea = useRef(null);
    useEffect(() => {
        MediaService.getBecomeInstructorBanner()
            .then((res) => {
                if (ctaOneArea) {
                    ctaOneArea.current.style.background = `url('${Config.SERVER.URL + res.data.path}') center`;
                }
            })

    }, null)

    return (<section ref={ctaOneArea} className="cta-one-area relative section-gap">
        <div className="container">
            <div className="overlay overlay-bg"></div>
            <div className="row justify-content-center">
                <div className="wrap">
                    <h1 className="text-white">Become an instructor</h1>
                    <p>
                        There is a moment in the life of any aspiring astronomer that it is time to buy that first
                        telescope. It’s exciting to think about setting up your own viewing station whether that is on
                        the deck.
                    </p>
                    <Link className="primary-btn wh" to={'/contact'}>Apply for the post</Link>
                </div>
            </div>
        </div>
    </section>)
}