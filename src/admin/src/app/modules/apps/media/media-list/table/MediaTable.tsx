import {KTCardBody} from "../../../../../../_metronic/helpers";
import {useMediaAssetResponseData, useMediaAssetResponseLoading} from "../core/MediaAssetQueryResponseProvider.tsx";
import React, {useMemo} from "react";
import {mediaAssetColumns} from "./columns/_media.asset.columns.tsx";
import {ColumnInstance, Row, useTable} from "react-table";
import {TableHeaderColumn} from "../../../common/components/table/TableHeaderColumn.tsx";
import {TableRow} from "../../../common/components/table/TableRow.tsx";
import {UsersListLoading} from "../../../user-management/users-list/components/loading/UsersListLoading.tsx";
import {MediaAsset} from "../core/_media.asset.model.ts";


const MediaTable=()=>{
    const isLoading = useMediaAssetResponseLoading();
    const mediaAssets = useMediaAssetResponseData();
    const data = useMemo(()=>mediaAssets,[mediaAssets]);
    const columns = useMemo(()=>mediaAssetColumns,[mediaAssetColumns]);
    const {getTableProps, getTableBodyProps,headers, rows, prepareRow} = useTable({
        data,
        columns
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
                        {headers.map((column: ColumnInstance<MediaAsset>) => (
                            <TableHeaderColumn key={`column-media-${column.id}`} column={column}/>
                        ))}
                    </tr>
                    </thead>
                    <tbody className='text-gray-600 fw-bold' {...getTableBodyProps()}>
                    {rows.length > 0 ? (
                        rows.map((row: Row<MediaAsset>, i) => {
                            prepareRow(row)
                            return <TableRow row={row} key={`row-media-${i}-${row.id}`} />
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
export {MediaTable}