import {PostFetchService} from "../../../../../tools/PostFetchService";
import {useState} from "react";

export default function SearchPostWidget() {
    const [query, setQuery] = useState('');

    function searchClickHandler() {
        PostFetchService.query =query.trim().replaceAll(' ','%20');
        PostFetchService.refresh();

    }

    return (<div className="single-sidebar-widget search-widget">
        <form className="search-form">
            <input placeholder="Search Posts" name="search" type="text"
                   value={query}
                   onChange={(e) => {
                       setQuery(e.target.value)
                   }}/>
            <button type='button' onClick={searchClickHandler}><i className="fa fa-search"></i></button>
        </form>
    </div>);
}