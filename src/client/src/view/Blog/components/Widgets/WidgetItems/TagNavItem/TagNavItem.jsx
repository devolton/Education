import {PostFetchService} from "../../../../../../tools/PostFetchService";
import './TagNamItem.css'

export default function TagNavItem({oneTag}){

    function onTagClick(){
        PostFetchService.category='';
        PostFetchService.tag=oneTag.name.replaceAll(' ','%20');
        PostFetchService.refresh();

    }
    return(
        <li className='m-2'>
            <a type='button' onClick={onTagClick}>{oneTag.name}</a>
        </li>
    );
}