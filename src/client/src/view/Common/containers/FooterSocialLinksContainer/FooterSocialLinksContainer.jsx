import SocialMediaItem from "../../components/SocialMediaItem/SocialMediaItem";

export default function FooterSocialLinksContainer({socialLinkCollection}){

    return (
        <div className="col-lg-6 col-sm-12 footer-social">
            {
                socialLinkCollection.map((oneSocialLink)=>{
                    return <SocialMediaItem key={'social-item-'+oneSocialLink.id} href={oneSocialLink.value} socialMediaName={oneSocialLink.name}/>
                })
            }
        </div>
    )
}