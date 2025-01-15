import NavItem from "../../components/NavItem/NavItem";
import {useAuth} from "../../../../contexts/AuthContext";
import {Link} from 'react-router-dom'

export default function HeaderNavContainer({navigations}){
    const { isAuthenticated, login, logout} = useAuth();
    return (  <nav id="nav-menu-container">
        <ul className="nav-menu">
            {navigations.map((oneNav)=>{
                return (<NavItem key={'nav-'+oneNav.id} href={oneNav.href} title={oneNav.title}></NavItem> )
            })}
            {(!isAuthenticated)?
                (<NavItem key={'login'} href='/auth/login' title={'Login'}/> )
                : (<Link type={'button'} onClick={()=>{logout()}} key={'logout'} title={'Logout'}>Logout</Link> )}
        </ul>
    </nav>)

}