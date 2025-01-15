import {useOptionsQueryResponseData, useOptionsQueryResponseLoading} from "../core/OptionQueryResponseProvider.tsx";
import React, {useEffect, useMemo} from "react";
import {KTCardBody} from "../../../../../../_metronic/helpers";
import {ColumnInstance, Row, useTable} from "react-table";
import {CustomUser} from "../../../user-management/custom-users-list/core/custom.user.model.ts";
import {
    CustomUserHeaderColumn
} from "../../../user-management/custom-users-list/table/columns/CustomUserHeaderColumn.tsx";
import {UsersListLoading} from "../../../user-management/users-list/components/loading/UsersListLoading.tsx";
import {TableRow} from "../../../common/components/table/TableRow.tsx";
import {optionColumns} from "./columns/option.columns.tsx";
import {Option} from "../core/_option.model.ts";
import {TableHeaderColumn} from "../../../common/components/table/TableHeaderColumn.tsx";


const OptionTable=()=>{
    const options = useOptionsQueryResponseData();
    const isLoading = useOptionsQueryResponseLoading();
    const data = useMemo(()=>options,[options])
    const columns = useMemo(()=>optionColumns,[optionColumns])
    const {getTableProps, getTableBodyProps, headers, rows, prepareRow} = useTable({columns,data});

    useEffect(()=>{
    },[])

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
                        {headers.map((column: ColumnInstance<Option>) => (
                            <TableHeaderColumn key={`column-${column.id}`} column={column}/>
                        ))}
                    </tr>
                    </thead>
                    <tbody className='text-gray-600 fw-bold' {...getTableBodyProps()}>
                    {rows.length > 0 ? (
                        rows.map((row: Row<Option>, i) => {
                            prepareRow(row)
                            return <TableRow row={row} key={`row-${i}-${row.id}`} />
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


export {OptionTable}