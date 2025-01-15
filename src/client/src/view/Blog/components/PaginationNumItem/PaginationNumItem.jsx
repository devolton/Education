import {PostFetchService} from "../../../../tools/PostFetchService";
import {useEffect, useRef} from "react";
import {PagItemBackgroundChanger} from "../../../../tools/PagItemBackgroundChanger";

export default function PaginationNumItem({pageNum,key=null}){
    const pagItemRef = useRef();
    useEffect(()=>{
        PostFetchService.pushPagRef(pageNum,pagItemRef);
    },[])
    function activePageHandler(){
     PostFetchService.setActivePage(pagItemRef,pageNum);

    }

    return(
        <li key={key} ref={pagItemRef} className="page-item">
            <a type={'button'} onClick={activePageHandler} className="page-link">{pageNum}</a>
        </li>
    )
}