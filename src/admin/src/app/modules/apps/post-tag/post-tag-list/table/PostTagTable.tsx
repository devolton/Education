import {KTCardBody} from "../../../../../../_metronic/helpers";
import {usePostTagQueryResponseData, usePostTagQueryResponseLoading} from "../core/PostTagResponseProvider.tsx";
import {PostTag} from "../core/_post.tag.model.ts";
import React, {useEffect, useMemo} from "react";
import {ColumnInstance, Row, useTable} from "react-table";
import {postTagColumn} from "./columns/_post.tag.column.tsx";
import {UsersListLoading} from "../../../user-management/users-list/components/loading/UsersListLoading.tsx";
import {TableHeaderColumn} from "../../../common/components/table/TableHeaderColumn.tsx";
import {TableRow} from "../../../common/components/table/TableRow.tsx";

const PostTagTable = () => {
    const postTags: PostTag[] = usePostTagQueryResponseData();
    const isLoading: boolean = usePostTagQueryResponseLoading();
    const data = useMemo(() => postTags, [postTags]);
    let columns = useMemo(() => postTagColumn, [postTagColumn]);
    const {getTableProps, getTableBodyProps, headers, rows, prepareRow} = useTable(
        {
            columns,
            data
        }
    )
    return (
        <KTCardBody className='py-4'>
            <div className='table-responsive'>
                <table
                    id='kt_table_users'
                    className='table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer'
                    {...getTableProps()}
                >
                    <thead>
                    <tr className='text-start text-muted fw-bolder fs-7 text-uppercase gs-0'>
                        {headers.map((column: ColumnInstance<PostTag>) => (
                            <TableHeaderColumn key={`column-tag-${column.id}`} column={column}/>
                        ))}
                    </tr>
                    </thead>
                    <tbody className='text-gray-600 fw-bold' {...getTableBodyProps()}>
                    {rows.length > 0 ? (
                        rows.map((row: Row<PostTag>, i) => {
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
export {PostTagTable}