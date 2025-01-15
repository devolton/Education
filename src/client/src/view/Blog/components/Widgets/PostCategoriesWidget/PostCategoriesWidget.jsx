
import NavCategoryItem from "../WidgetItems/NavCategoryItem/NavCategoryItem";

export default function PostCategoriesWidget({categoriesCollection}){

    return( <ul className="cat-list">{
        categoriesCollection.map((oneCategory)=>{
            return (<NavCategoryItem category={oneCategory}/>)
        })

    }
    </ul>)
}