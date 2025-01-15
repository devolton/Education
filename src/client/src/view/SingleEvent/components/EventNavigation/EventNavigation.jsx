import {Link} from 'react-router-dom'
function EventNavigation({nextPrevEventNavPair}){
    return (
        <div className="col-lg-6 col-md-6 navs">
            <Link to={`/events/${nextPrevEventNavPair[0]}`} className="nav-prev"><span className="lnr lnr-arrow-left"></span>Prev Event</Link>
            <Link to={`/events/${nextPrevEventNavPair[1]}`} className="nav-next">Next Event<span className="lnr lnr-arrow-right"></span></Link>
        </div>
    )

}
export default EventNavigation;