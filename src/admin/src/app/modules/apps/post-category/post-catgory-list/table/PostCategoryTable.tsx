import {KTCardBody} from "../../../../../../_metronic/helpers";
import {
    usePostCategoryQueryResponseData,
    usePostCategoryQueryResponseLoading
} from "../core/PostCategoryQueryResponseProvider.tsx";
import React, {useMemo} from "react";
import {postCategoryColumns} from "./columns/_post.category.columns.tsx";
import {ColumnInstance, Row, useTable} from "react-table";
import {TableRow} from "../../../common/components/table/TableRow.tsx";
import {TableHeaderColumn} from "../../../common/components/table/TableHeaderColumn.tsx";
import {UsersListLoading} from "../../../user-management/users-list/components/loading/UsersListLoading.tsx";
import {PostCategory} from "../core/_post.category.model.ts";

const PostCategoryTable = () => {
    const categories = usePostCategoryQueryResponseData();
    const isLoading = usePostCategoryQueryResponseLoading();
    const data = useMemo(()=>categories,[categories]);
    const columns = useMemo(()=>postCategoryColumns,[postCategoryColumns]);
    const {getTableProps, getTableBodyProps, headers,rows, prepareRow}=useTable({
        columns,
        data
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
                        {headers.map((column: ColumnInstance<PostCategory>) => (
                            <TableHeaderColumn key={`column-tag-${column.id}`} column={column}/>
                        ))}
                    </tr>
                    </thead>
                    <tbody className='text-gray-600 fw-bold' {...getTableBodyProps()}>
                    {rows.length > 0 ? (
                        rows.map((row: Row<PostCategory>, i) => {
                            prepareRow(row)
                            return <TableRow row={row} key={`row-tag-${i}-${row.id}`} />
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
export {PostCategoryTable}