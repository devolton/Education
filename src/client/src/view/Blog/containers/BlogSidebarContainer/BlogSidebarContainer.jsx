
import SearchPostWidget from "../../components/Widgets/SearchPostWidget/SearchPostWidget";
import PopularPostsWidget from "../../components/Widgets/PopularPostsWidget/PopularPostsWidget";
import PostCategoriesWidgetContainer from "../PostCategoriesWidgetContainer/PostCategoriesWidgetContainer";
import TagWidgetContainer from "../TagWidgetContainer/TagWidgetContainer";


export default function BlogSidebarContainer() {

    return (
        <div className="col-lg-4 sidebar-widgets">
            <div className="widget-wrap">
                <SearchPostWidget/>
                <PopularPostsWidget/>
                <PostCategoriesWidgetContainer/>
                <TagWidgetContainer/>

            </div>
        </div>
    )
}