
import {Link} from "react-router-dom";
import Config from '../../../../config';
import SocialMediaItem from "../../../Common/components/SocialMediaItem/SocialMediaItem";

export default function AuthorInfoBlock({author}){

    return(<div className="col-lg-4 sidebar-widgets">
        <div className="widget-wrap">

            <div className="single-sidebar-widget user-info-widget">
                <img src={Config.SERVER.URL+author.avatarPath} alt="userAvatar"/>
                <a href="#"><h4>{author.fullName}</h4></a>
                <p>
                    {author.position} blog writer
                </p>
                <ul className="social-links">
                    <li><SocialMediaItem socialMediaName='facebook' href={author.instagramHref}/></li>
                    <li><SocialMediaItem socialMediaName='twitter' href={author.twitterHref}/></li>
                    <li><SocialMediaItem socialMediaName='instagram' href={author.instagramHref} /></li>
                </ul>
                <p>
                    {author.slogan}
                </p>
            </div>
        </div>
    </div>)
}