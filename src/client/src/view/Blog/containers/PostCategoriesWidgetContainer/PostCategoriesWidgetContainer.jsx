
import PostCategoriesWidget from "../../components/Widgets/PostCategoriesWidget/PostCategoriesWidget";
import {useEffect, useState} from "react";
import {PostService} from "../../../../service/post.service";

export default function PostCategoriesWidgetContainer() {
    const LIMIT= 6;
    const [categoryCollection, setCategoryCollection] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        PostService.getPostCategories(LIMIT)
            .then(res=>{
                setCategoryCollection(res);
                setIsLoaded(true);

            }).catch(err=>{
                console.log(err);
        })

    }, [])

    if (!isLoaded) {
        return (<h1>Loading...</h1>);
    } else {

        return (
            <div className="single-sidebar-widget post-category-widget">
                <h4 className="category-title">Post Categories</h4>
                <PostCategoriesWidget categoriesCollection={categoryCollection}/>
            </div>
        );
    }
}