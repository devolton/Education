import PaginationNumItem from "../PaginationNumItem/PaginationNumItem";
import {useEffect, useState} from "react";
import {PostFetchService} from "../../../../tools/PostFetchService";

export default function PostsPagination({pagObjCollection}) {


    return (<nav className="blog-pagination justify-content-center d-flex">
        <ul className="pagination">
            <li className="page-item">
                <a type={'button'} onClick={()=>{PostFetchService.decrementActivePage()}} className="page-link" aria-label="Previous">
		                                    <span aria-hidden="true">
		                                        <span className="lnr lnr-chevron-left"></span>
		                                    </span>
                </a>
            </li>
            {
                pagObjCollection.map((oneObj) => {
                    return <PaginationNumItem key={'pagination-'+pagObjCollection.order} pageNum={oneObj.order}/>
                })
            }

            <li className="page-item">
                <a type={'button'} onClick={()=>{PostFetchService.incrementActivePage()}} className="page-link" aria-label="Next">
		                                    <span aria-hidden="true">
		                                        <span className="lnr lnr-chevron-right"></span>
		                                    </span>
                </a>
            </li>
        </ul>
    </nav>)

}