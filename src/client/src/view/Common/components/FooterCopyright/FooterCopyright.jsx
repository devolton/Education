import {useEffect, useState} from "react";

export default function FooterCopyright(){
    const [currentYear,setCurrentYear]=useState('');
    useEffect(()=>{
        setCurrentYear('Copyright @'+new Date().getFullYear().toString()+'  All rights reserved ')
    },[]);

    return (  <p className="footer-text m-0 col-lg-6 col-md-12">
        {currentYear}

    </p>);
}