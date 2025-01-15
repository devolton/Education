import { SocialLinkMappable} from "../../../../../../../_metronic/helpers";
import {FC} from "react";
import {SocialLinkItem} from "./SocialLinkItem.tsx";

type Props={
    socialLinkCollection:Array<SocialLinkMappable>
}
const SocialLinksCell:FC<Props> = ({socialLinkCollection}) => {

    return (
        <div className='d-flex justify-content-around'>
            { socialLinkCollection!==undefined &&
                socialLinkCollection.map(socialLink=>{
                    return (<SocialLinkItem key={socialLink.name+"."+socialLink.href} socialLinkObj={socialLink}/>)
                })

            }

        </div>
    )
}
export {SocialLinksCell}