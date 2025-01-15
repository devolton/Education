import TagNavItem from "../../components/Widgets/WidgetItems/TagNavItem/TagNavItem";
import TagWidgetBlock from "../../components/Widgets/TagWidgetBlock/TagWidgetBlock";
import {useEffect, useState} from "react";
import {PostService} from "../../../../service/post.service";

export default function TagWidgetContainer() {
    const TAG_LIMIT = 6;
    const [tagCollection, setTagCollection] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(()=>{
        PostService.getPostTags(TAG_LIMIT)
            .then((res)=>{
                setTagCollection(res.data);
                setIsLoaded(true);
            }).catch(err=>{
                console.log(err);
        })

    },[]);

    if (!isLoaded) {
        return (<h1>Loading...</h1>)
    } else {
        return (<div className="single-sidebar-widget tag-cloud-widget">
            <h4 className="tagcloud-title">Tag Clouds</h4>
            <TagWidgetBlock tagCollection={tagCollection}/>
        </div>)
    }
}