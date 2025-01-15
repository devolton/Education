import {useMessagesQueryResponseData, useMessagesQueryResponseLoading} from "../core/MessageQueryResponseProvider.tsx";
import React, {useMemo} from "react";
import {KTCardBody} from "../../../../../../_metronic/helpers";
import {messageColumns} from "./columns/_message.columns.tsx";
import {ColumnInstance, Row, useTable} from "react-table";
import {TableHeaderColumn} from "../../../common/components/table/TableHeaderColumn.tsx";
import {TableRow} from "../../../common/components/table/TableRow.tsx";
import {UsersListLoading} from "../../../user-management/users-list/components/loading/UsersListLoading.tsx";
import {EmailMessage} from "../core/_message.model.ts";

const MessageTable = () => {
    const isLoading = useMessagesQueryResponseLoading();
    const messages = useMessagesQueryResponseData();
    const data = useMemo(() => messages, [messages]);
    const columns = useMemo(()=>messageColumns,[messageColumns]);
    const {getTableProps, getTableBodyProps, headers,rows, prepareRow} = useTable({
        columns,data
    })



    return (<KTCardBody>
        <div className='table-responsive'>
            <table
                id='kt_table_users'
                className='table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer'
                {...getTableProps()}
            >
                <thead>
                <tr className='text-start text-muted fw-bolder fs-7 text-uppercase gs-0'>
                    {headers.map((column: ColumnInstance<EmailMessage>) => (
                        <TableHeaderColumn key={`column-message-${column.id}`} column={column}/>
                    ))}
                </tr>
                </thead>
                <tbody className='text-gray-600 fw-bold' {...getTableBodyProps()}>
                {rows.length > 0 ? (
                    rows.map((row: Row<EmailMessage>, i) => {
                        prepareRow(row)
                        return <TableRow row={row} key={`row-message-${i}-${row.id}`} />
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
    </KTCardBody>)

}
export {MessageTable}