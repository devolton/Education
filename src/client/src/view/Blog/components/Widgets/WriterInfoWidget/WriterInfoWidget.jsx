import userInfoLogo from "../../../../../img/blog/user-info.png";

export default function WriterInfoWidget(){

    return (
        <div className="single-sidebar-widget user-info-widget">
            <img src={userInfoLogo} alt="imag"/>
            <a href="#"><h4>Charlie Barber</h4></a>
            <p>
                Senior blog writer
            </p>
            <ul className="social-links">
                <li><a href="#"><i className="fa fa-facebook"></i></a></li>
                <li><a href="#"><i className="fa fa-twitter"></i></a></li>
                <li><a href="#"><i className="fa fa-github"></i></a></li>
                <li><a href="#"><i className="fa fa-behance"></i></a></li>
            </ul>
            <p>
                Boot camps have its supporters andit sdetractors. Some people do not understand
                why you should have to spend money on boot camp when you can get. Boot camps
                have itssuppor ters andits detractors.
            </p>
        </div>
    )
}