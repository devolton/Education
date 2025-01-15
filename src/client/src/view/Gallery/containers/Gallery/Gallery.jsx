import Config from '../../../../config';

export default function Gallery(){
    return(<section className="gallery-area section-gap">
        <div className="container">
            <div className="row">
                <div className="col-lg-7">
                    <a type={'button'} className="img-gal">
                        <div className="single-imgs relative">
                            <div className="overlay overlay-bg"></div>
                            <div className="relative">
                                <img className="img-fluid" src={Config.SERVER.URL+"/static/gallery/g1.jpg"} alt=""/>
                            </div>
                        </div>
                    </a>
                </div>
                <div className="col-lg-5">
                    <a type={'button'} className="img-gal">
                        <div className="single-imgs relative">
                            <div className="overlay overlay-bg"></div>
                            <div className="relative">
                                <img className="img-fluid" src={Config.SERVER.URL+"/static/gallery/g2.jpg"} alt=""/>
                            </div>
                        </div>
                    </a>
                </div>
                <div className="col-lg-4">
                    <a type={'button'} className="img-gal">
                        <div className="single-imgs relative">
                            <div className="overlay overlay-bg"></div>
                            <div className="relative">
                                <img className="img-fluid" src={Config.SERVER.URL+"/static/gallery/g3.jpg"} alt=""/>
                            </div>
                        </div>
                    </a>
                </div>
                <div className="col-lg-4">
                    <a type={'button'} className="img-gal">
                        <div className="single-imgs relative">
                            <div className="overlay overlay-bg"></div>
                            <div className="relative">
                                <img className="img-fluid" src={Config.SERVER.URL+"/static/gallery/g4.jpg"} alt=""/>
                            </div>
                        </div>
                    </a>
                </div>
                <div className="col-lg-4">
                    <a type={'button'} className="img-gal">
                        <div className="single-imgs relative">
                            <div className="overlay overlay-bg"></div>
                            <div className="relative">
                                <img className="img-fluid" src={Config.SERVER.URL+"/static/gallery/g5.jpg"} alt=""/>
                            </div>
                        </div>
                    </a>
                </div>
                <div className="col-lg-5">
                    <a type={'button'} className="img-gal">
                        <div className="single-imgs relative">
                            <div className="overlay overlay-bg"></div>
                            <div className="relative">
                                <img className="img-fluid" src={Config.SERVER.URL+"/static/gallery/g6.jpg"} alt=""/>
                            </div>
                        </div>
                    </a>
                </div>
                <div className="col-lg-7">
                    <a type={'button'} className="img-gal">
                        <div className="single-imgs relative">
                            <div className="overlay overlay-bg"></div>
                            <div className="relative">
                                <img className="img-fluid" src={Config.SERVER.URL+"/static/gallery/g7.jpg"} alt=""/>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    </section>);
}