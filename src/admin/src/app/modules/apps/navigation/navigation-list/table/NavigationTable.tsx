import {KTCardBody} from "../../../../../../_metronic/helpers";
import {
    useNavigationsQueryResponseData,
    useNavigationsQueryResponseLoading
} from "../core/NavigationQueryResponseProvider.tsx";
import {Navigation} from "../core/_navigation.model.ts";
import React, {useMemo} from "react";
import {navigationColumns} from "./columns/_navigation.columns.tsx";
import {ColumnInstance, Row, useTable} from "react-table";
import {Option} from "../../../option/option-list/core/_option.model.ts";
import {TableHeaderColumn} from "../../../common/components/table/TableHeaderColumn.tsx";
import {TableRow} from "../../../common/components/table/TableRow.tsx";
import {UsersListLoading} from "../../../user-management/users-list/components/loading/UsersListLoading.tsx";


const NavigationTable=()=>{
    const isLoading:boolean = useNavigationsQueryResponseLoading();
    const navigations:Array<Navigation> = useNavigationsQueryResponseData();
    const data = useMemo(()=>navigations,[navigations]);
    const columns = useMemo(()=>navigationColumns,[navigationColumns]);
    const {getTableProps,getTableBodyProps,headers,rows,prepareRow} = useTable({
        data,
        columns
    })


    return(
        <KTCardBody className='py-4'>
            <div className='table-responsive'>
                <table
                    id='kt_table_users'
                    className='table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer'
                    {...getTableProps()}
                >
                    <thead>
                    <tr className='text-start text-muted fw-bolder fs-7 text-uppercase gs-0'>
                        {headers.map((column: ColumnInstance<Navigation>) => (
                            <TableHeaderColumn key={`column-navigation-${column.id}`} column={column}/>
                        ))}
                    </tr>
                    </thead>
                    <tbody className='text-gray-600 fw-bold' {...getTableBodyProps()}>
                    {rows.length > 0 ? (
                        rows.map((row: Row<Navigation>, i) => {
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

export {NavigationTable}