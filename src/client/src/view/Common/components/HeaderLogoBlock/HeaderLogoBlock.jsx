import {Link} from "react-router-dom";
import Config from "../../../../config";

export default function HeaderLogoBlock({logoObj}){

    return (   <div id="logo">
        <Link  to='/'><img src={Config.SERVER.URL+logoObj.path} alt={logoObj.alt} title={logoObj.alt}/></Link>
    </div>);
}