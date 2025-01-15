import {useEffect, useState} from "react";
import FooterLinksBlock from "../../components/FooterLinksBlock/FooterLinksBlock";
import FooterCopyright from "../../components/FooterCopyright/FooterCopyright";
import FooterSocialLinksContainer from "../FooterSocialLinksContainer/FooterSocialLinksContainer";
import FooterNewsletterSubscribeBlock
    from "../../components/FooterNewsletterSubscribeBlock/FooterNewsletterSubscribeBlock";
import {OptionService} from "../../../../service/option.service";

export default function Footer() {
    const [socialLinksCollection, setSocialLinksCollection]= useState([]);
    useEffect(()=>{
        OptionService.getSocialLinkOptions()
            .then(res=>{
                setSocialLinksCollection(res.data);
            }).catch(err=>{
                console.log(err);
        })

    },[]);

    return (
        <footer className="footer-area section-gap">
            <div className="container">
                <div className="row d-flex justify-content-between">
                    <FooterLinksBlock/>
                    <FooterNewsletterSubscribeBlock/>
                </div>
                <div className="footer-bottom row align-items-center justify-content-between">
                    <FooterCopyright/>
                    <FooterSocialLinksContainer socialLinkCollection={socialLinksCollection}/>
                </div>
            </div>
        </footer>
    )
}