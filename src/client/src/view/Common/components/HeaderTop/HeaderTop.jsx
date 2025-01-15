import SocialMediaItem from "../SocialMediaItem/SocialMediaItem";
import HeaderContactInfoContainer from "../../containers/HeaderContactInfoContainer/HeaderContactInfoContainer";
import {useEffect, useState} from "react";
import {OptionService} from "../../../../service/option.service";

export default function HeaderTop(){
    const [contactInfoCollection, setContactInfoCollection] = useState([]);
    const [socialLinksCollection,setSocialLinksCollection] = useState([]);
    useEffect(()=>{
        OptionService.getContactInfoOptions()
            .then((res)=>{
                setContactInfoCollection(res.data);

            }).catch(err=>{
                console.log(err);
        });
        OptionService.getSocialLinkOptions()
            .then((res)=>{
                setSocialLinksCollection(res.data);

            }).catch(err=>{
                console.log(err);
        })

    },[]);

    return (    <div className="header-top">
        <div className="container">
            <div className="row">
                <div className="col-lg-6 col-sm-6 col-8 header-top-left no-padding">
                    <ul>
                        {
                            socialLinksCollection.map(oneSocialLink=>{
                                return ( <li><SocialMediaItem key={'social-header-link-'+oneSocialLink.id} href={oneSocialLink.value} socialMediaName={oneSocialLink.name}/></li>)
                            })
                        }
                    </ul>
                </div>
            <HeaderContactInfoContainer contactInfoCollection={contactInfoCollection}/>
            </div>
        </div>
    </div>)
}