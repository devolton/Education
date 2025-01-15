import {Link} from "react-router-dom";
import {useAuth} from "../../../../contexts/AuthContext";
import {useEffect} from "react";

export default function HeaderContactInfoContainer({contactInfoCollection}) {
    const {isAuthenticated, login, logout, singIn,checkAuth} =useAuth();
    useEffect(()=>{

        if(localStorage.getItem('token')){
            checkAuth();
        }

    },[])

    return (
        <div className="col-lg-6 col-sm-6 col-4 header-top-right no-padding">
            {contactInfoCollection.map((oneContact)=>{
                return(<Link key={'contact-link-'+oneContact.id} to={oneContact.value}><span className='text'>{oneContact.value}</span></Link>)
            })}
        </div>)
}