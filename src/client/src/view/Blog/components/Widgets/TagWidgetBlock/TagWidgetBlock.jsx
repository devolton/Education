import TagNavItem from "../WidgetItems/TagNavItem/TagNavItem";

export  default function   TagWidgetBlock({tagCollection}){

    return (     <ul>
        {
            tagCollection.map((oneTag)=>{
                return(<TagNavItem oneTag={oneTag}/> )
            })
        }
    </ul>)
}