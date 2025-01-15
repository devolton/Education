import {ColorBack, SocialLinkMappable, SocialMedia} from "../../../../../../../_metronic/helpers";
import {FC} from "react";


type Props={
   socialLinkObj:SocialLinkMappable
}

const SocialLinkItem:FC<Props>=({socialLinkObj})=>{

    return (
        <a href={socialLinkObj.href}
            target={'_blank'}>
            <div className="symbol-label bg-light p-2  rounded-4">
                <i className={`ki-duotone ki-${socialLinkObj.name} fs-1 text-${socialLinkObj.backColor}`}><span
                    className="path1"></span><span className="path2"></span><span className="path3"></span><span
                    className="path4"></span></i>
            </div>
        </a>
    )
}
export {SocialLinkItem};