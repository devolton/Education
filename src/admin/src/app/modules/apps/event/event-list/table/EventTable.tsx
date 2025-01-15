import {KTCardBody} from "../../../../../../_metronic/helpers";
import {useEventResponseData, useEventResponseLoading} from "../core/EventQueryResponseProvider.tsx";
import React, {useMemo} from "react";
import {eventColumns} from "./columns/_event.columns.tsx";
import {Column, ColumnInstance, Row, useTable} from "react-table";
import {BlogPost} from "../../../post/post-list/core/_post.model.ts";
import {TableHeaderColumn} from "../../../common/components/table/TableHeaderColumn.tsx";
import {TableRow} from "../../../common/components/table/TableRow.tsx";
import {UsersListLoading} from "../../../user-management/users-list/components/loading/UsersListLoading.tsx";
import {Event} from '../core/_event.model.ts';


const EventTable=()=>{
    const isLoading:boolean = useEventResponseLoading();
    const events:Array<Event> = useEventResponseData();
    const data:Array<Event> = useMemo(()=>events,[events]);
    const columns :ReadonlyArray<Column<Event>> =useMemo(()=>eventColumns,[eventColumns]);
    const {getTableProps, getTableBodyProps, headers,rows,prepareRow} = useTable({
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
                        {headers.map((column: ColumnInstance<Event>) => (
                            <TableHeaderColumn key={`column-event-${column.id}`} column={column}/>
                        ))}
                    </tr>
                    </thead>
                    <tbody className='text-gray-600 fw-bold' {...getTableBodyProps()}>
                    {rows.length > 0 ? (
                        rows.map((row: Row<Event>, i) => {
                            prepareRow(row)
                            return <TableRow row={row} key={`row-event-${i}-${row.id}`} />
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
export {EventTable}