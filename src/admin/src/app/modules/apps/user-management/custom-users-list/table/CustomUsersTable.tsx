import React, {useEffect, useMemo, useState} from 'react';

import {KTCardBody, QUERIES} from "../../../../../../_metronic/helpers";
import {
    useCustomQueryResponseData,
    useCustomUserQueryResponseLoading
} from "../core/CustomUserQueryResponseProvider.tsx";
import {ColumnInstance, Row, useTable} from "react-table";
import {UsersListLoading} from "../../users-list/components/loading/UsersListLoading.tsx";
import {customUserColumns} from "./_custom.user.columns.tsx";
import {CustomUser} from "../core/custom.user.model.ts";
import {TableRow} from "../../../common/components/table/TableRow.tsx";
import {TableHeaderColumn} from "../../../common/components/table/TableHeaderColumn.tsx";


const CustomUsersTable = () => {
    const customUsers = useCustomQueryResponseData();
    const isLoading = useCustomUserQueryResponseLoading();
    const data = useMemo(() => customUsers, [customUsers]);
    const columns = useMemo(() => customUserColumns, [customUserColumns]);
    const {getTableProps, getTableBodyProps, headers, rows, prepareRow} = useTable({
        columns,
        data,
    })

    useEffect(() => {
    }, [customUsers]);
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
                        {headers.map((column: ColumnInstance<CustomUser>) => (
                            <TableHeaderColumn  key={`column-${column.id}`} column={column}/>
                        ))}
                    </tr>
                    </thead>
                    <tbody className='text-gray-600 fw-bold' {...getTableBodyProps()}>
                    {rows.length > 0 ? (
                        rows.map((row: Row<CustomUser>, i) => {
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
    );
};

export {CustomUsersTable};