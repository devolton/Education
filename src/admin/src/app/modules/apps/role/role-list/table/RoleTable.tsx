import {KTCard, KTCardBody} from "../../../../../../_metronic/helpers";
import {ColumnInstance, Row, useTable} from "react-table";
import {PostTag} from "../../../post-tag/post-tag-list/core/_post.tag.model.ts";
import {UsersListLoading} from "../../../user-management/users-list/components/loading/UsersListLoading.tsx";
import React, {useMemo} from "react";
import {useRoleQueryResponseData, useRoleQueryResponseLoading} from "../core/RoleQueryResponseProvider.tsx";
import {Role} from "../core/_role.model.ts";
import {roleColumn} from "./columns/role.column.tsx";
import {TableHeaderColumn} from "../../../common/components/table/TableHeaderColumn.tsx";
import {TableRow} from "../../../common/components/table/TableRow.tsx";

const RoleTable = () => {
    const isLoading:boolean = useRoleQueryResponseLoading();
    const roles:Role[] = useRoleQueryResponseData();
    const data = useMemo(()=>roles,[roles]);
    const columns = useMemo(()=>roleColumn,[roleColumn]);
    const {getTableProps, getTableBodyProps, headers, rows, prepareRow} = useTable({
        columns,
        data
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
                    {headers.map((column: ColumnInstance<Role>) => (
                        <TableHeaderColumn key={`column-role-${column.id}`} column={column}/>
                    ))}
                </tr>
                </thead>
                <tbody className='text-gray-600 fw-bold' {...getTableBodyProps()}>
                {rows.length > 0 ? (
                    rows.map((row: Row<Role>, i) => {
                        prepareRow(row)
                        return <TableRow row={row} key={`row-role-${i}-${row.id}`} />
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
export {RoleTable}