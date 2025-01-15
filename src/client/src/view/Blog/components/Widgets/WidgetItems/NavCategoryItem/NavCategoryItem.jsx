import './NavCategoryItem.css'
import {PostFetchService} from "../../../../../../tools/PostFetchService";
export default function NavCategoryItem({category}){

    function onCategorySelected(){
        PostFetchService.category=category.name.replaceAll(' ', '%20');
        PostFetchService.tag='';
        PostFetchService.refresh();
    }

    return(  <li className='nav-category'>
        <a role={'button'} className="d-flex justify-content-between" onClick={onCategorySelected}>
            <p>{category.name}</p>
            <p>37</p>
        </a>
    </li>)
}