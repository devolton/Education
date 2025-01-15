
import Config from '../../../../config';
import {Link} from 'react-router-dom'

export default function PostNavigationBlock({neighbourPostsPair}){

    return ( <div className="navigation-area">
        <div className="row">
            <div
                className="col-lg-6 col-md-6 col-12 nav-left flex-row d-flex justify-content-start align-items-center">
                <div className="thumb post-nav-img-container">
                    <Link to={`/blog/${neighbourPostsPair[0].slug}`}><img className="img-fluid" src={Config.SERVER.URL+neighbourPostsPair[0].thumbnailPath} alt="im"/></Link>
                </div>
                <div className="arrow">
                    <Link to={`/blog/${neighbourPostsPair[0].slug}`}><span className="lnr text-white lnr-arrow-left"></span></Link>
                </div>
                <div className="detials">
                    <p>Prev Post</p>
                    <Link to={`/blog/${neighbourPostsPair[0].slug}`}><h4>{neighbourPostsPair[0].title}</h4></Link>
                </div>
            </div>
            <div
                className="col-lg-6 col-md-6 col-12 nav-right flex-row d-flex justify-content-end align-items-center">
                <div className="detials">
                    <p>Next Post</p>
                    <Link to={`/blog/${neighbourPostsPair[1].slug}`}><h4>{neighbourPostsPair[1].title}</h4></Link>
                </div>
                <div className="arrow">
                    <Link to={`/blog/${neighbourPostsPair[1].slug}`}><span className="lnr text-white lnr-arrow-right"></span></Link>
                </div>
                <div className="thumb post-nav-img-container">
                    <Link to={`/blog/${neighbourPostsPair[1].slug}`}><img className="img-fluid" src={Config.SERVER.URL+neighbourPostsPair[1].thumbnailPath} alt={neighbourPostsPair[1].imgAlt}/></Link>
                </div>
            </div>
        </div>
    </div>)
}