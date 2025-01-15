import {Link} from "react-router-dom";

export default function SocialMediaItem({href,socialMediaName,key}){

    return(
        <Link to={href} target='true'><i className={"fa fa-"+socialMediaName}></i></Link>
    )
}