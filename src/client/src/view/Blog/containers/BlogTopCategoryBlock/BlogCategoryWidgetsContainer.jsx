
import BlogTopCategoryBlock from "../../components/Widgets/BlogTopCategoryBlock/BlogTopCategoryBlock";
import {useEffect, useState} from "react";
import {PostService} from "../../../../service/post.service";


export default function BlogCategoryWidgetsContainer() {
    let LIMIT = 3;
    const [categoriesCollection, setCategoriesCollection] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        PostService.getPostCategories(LIMIT)
            .then((res) => {
                setCategoriesCollection(res);
                setIsLoaded(true);
            })

    }, [])
    if (!isLoaded) {
        return <h1>Loading...</h1>
    } else {
        return (
            <section className="top-category-widget-area pt-90 pb-90 ">
                <div className="container">
                    <BlogTopCategoryBlock postCategoryCollection={categoriesCollection} />
                </div>
            </section>
        )
    }
}