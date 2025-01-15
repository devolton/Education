import {Link} from "react-router-dom";

export default function NavItem({title, href}){

    return(
        <li>
            <Link to={href}>{title}</Link>
        </li>
    )
}