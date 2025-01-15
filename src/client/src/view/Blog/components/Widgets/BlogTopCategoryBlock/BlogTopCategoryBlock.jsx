import CategoryWidget from "../CategoryWidget/CategoryWidget";

export default function BlogTopCategoryBlock({postCategoryCollection}){


    return ( <div className="row">
        {
            postCategoryCollection.map((onePostCategory)=>{
                return (<CategoryWidget oneCategory={onePostCategory}  />)
            })

        }
    </div>)
}