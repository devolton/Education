
export default function TagsBlock({tags}){

    return (<ul className="tags">
        {tags.map((oneTag)=>{
            return<li key={'tag-'+oneTag.id}><p>{oneTag.name}</p></li>
        })}
    </ul>)
}