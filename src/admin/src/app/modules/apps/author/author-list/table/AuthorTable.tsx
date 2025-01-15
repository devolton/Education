import {KTCardBody} from "../../../../../../_metronic/helpers";
import {useAuthorResponseData, useAuthorResponseLoading} from "../core/AuthorQueryResponseProvider.tsx";
import React, {useMemo} from "react";
import {authorColumns} from "./columns/_author.columns.tsx";
import {ColumnInstance, Row, useTable} from "react-table";
import {Course} from "../../../course/course-list/core/_course.model.ts";
import {TableHeaderColumn} from "../../../common/components/table/TableHeaderColumn.tsx";
import {TableRow} from "../../../common/components/table/TableRow.tsx";
import {UsersListLoading} from "../../../user-management/users-list/components/loading/UsersListLoading.tsx";
import {Author} from "../core/_author.model.ts";


const AuthorTable=()=>{
    const authors = useAuthorResponseData();
    const isLoading = useAuthorResponseLoading();
    const data = useMemo(()=>authors,[authors]);
    const columns= useMemo(()=>authorColumns,[authorColumns]);
    const {getTableProps, getTableBodyProps, headers, rows, prepareRow} = useTable({
        columns,data
    })

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
                        {headers.map((column: ColumnInstance<Author>) => (
                            <TableHeaderColumn key={`column-author-${column.id}`} column={column}/>
                        ))}
                    </tr>
                    </thead>
                    <tbody className='text-gray-600 fw-bold' {...getTableBodyProps()}>
                    {rows.length > 0 ? (
                        rows.map((row: Row<Author>, i) => {
                            prepareRow(row)
                            return <TableRow row={row} key={`row-author-${i}-${row.id}`} />
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
export {AuthorTable}
