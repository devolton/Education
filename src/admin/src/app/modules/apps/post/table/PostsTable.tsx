import {KTCardBody} from "../../../../../_metronic/helpers";
import {usePostResponseData, usePostResponseLoading} from "../post-list/core/PostResponseProvider.tsx";
import {BlogPost} from "../post-list/core/_post.model.ts";
import {bool} from "yup";
import React, {useEffect, useMemo} from "react";
import {ColumnInstance, Row, useTable} from "react-table";
import {Option} from "../../option/option-list/core/_option.model.ts";
import {TableHeaderColumn} from "../../common/components/table/TableHeaderColumn.tsx";
import {TableRow} from "../../common/components/table/TableRow.tsx";
import {UsersListLoading} from "../../user-management/users-list/components/loading/UsersListLoading.tsx";
import {postColumns} from "./columns/_post.columns.tsx";


const PostsTable=()=>{
    const posts:BlogPost[] = usePostResponseData();
    const isLoading:boolean= usePostResponseLoading();
    const data = useMemo(()=>posts,[posts]);
    const columns = useMemo(()=>postColumns,[postColumns]);
    const {getTableProps, getTableBodyProps, headers,rows, prepareRow}=useTable({
        columns,data
    });

    return (
        <KTCardBody>
            <div className='table-responsive'>
                <table
                    id='kt_table_users'
                    className='table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer'
                    {...getTableProps()}
                >
                    <thead>
                    <tr className='text-start text-muted fw-bolder fs-7 text-uppercase gs-0'>
                        {headers.map((column: ColumnInstance<BlogPost>) => (
                            <TableHeaderColumn key={`column-post-${column.id}`} column={column}/>
                        ))}
                    </tr>
                    </thead>
                    <tbody className='text-gray-600 fw-bold' {...getTableBodyProps()}>
                    {rows.length > 0 ? (
                        rows.map((row: Row<BlogPost>, i) => {
                            prepareRow(row)
                            return <TableRow row={row} key={`row-post-${i}-${row.id}`} />
                        })
                    ) : (
                        <tr>
                            <td colSpan={7}>
                                <div className='d-flex text-center w-100 align-content-center justify-content-center'>
                                    No matching records found
                                </div>
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>

            {isLoading && <UsersListLoading/>}
        </KTCardBody>
    )
}

export {PostsTable}