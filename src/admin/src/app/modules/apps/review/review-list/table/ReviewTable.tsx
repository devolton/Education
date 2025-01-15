import {KTCardBody} from "../../../../../../_metronic/helpers";
import {ColumnInstance, Row, useTable} from "react-table";
import {Course} from "../../../course/course-list/core/_course.model.ts";
import {TableHeaderColumn} from "../../../common/components/table/TableHeaderColumn.tsx";
import {TableRow} from "../../../common/components/table/TableRow.tsx";
import {UsersListLoading} from "../../../user-management/users-list/components/loading/UsersListLoading.tsx";
import React, {useEffect, useMemo} from "react";
import {useReviewResponseData, useReviewResponseLoading} from "../core/ReviewQueryResponseProvider.tsx";
import {Review} from "../core/_review.model.ts";
import {reviewsColumns} from "./columns/_reviews.columns.tsx";


const ReviewTable=()=>{
    const isLoading = useReviewResponseLoading();
    const reviews:Array<Review> = useReviewResponseData();
    const data = useMemo(()=>reviews,[reviews]);
    const columns = useMemo(()=>reviewsColumns,[reviewsColumns]);
    const {getTableProps, getTableBodyProps, headers, rows, prepareRow} = useTable({
        columns,
        data
    })

    return(
        <KTCardBody>
            <div className='table-responsive'>
                <table
                    id='kt_table_users'
                    className='table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer'
                    {...getTableProps()}
                >
                    <thead>
                    <tr className='text-start text-muted fw-bolder fs-7 text-uppercase gs-0'>
                        {headers.map((column: ColumnInstance<Review>) => (
                            <TableHeaderColumn key={`column-course-${column.id}`} column={column}/>
                        ))}
                    </tr>
                    </thead>
                    <tbody className='text-gray-600 fw-bold' {...getTableBodyProps()}>
                    {rows.length > 0 ? (
                        rows.map((row: Row<Review>, i) => {
                            prepareRow(row)
                            return <TableRow row={row} key={`row-course-${i}-${row.id}`} />
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

export {ReviewTable}