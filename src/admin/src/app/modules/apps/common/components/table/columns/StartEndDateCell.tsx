import {FC, useEffect, useState} from "react";
import {formatDateTime} from "../../../../event/event-list/common/date.converter.ts";

type Props = {
    startDate:Date,
    endDate:Date
}
const StartEndDateCell:FC<Props> = ({startDate,endDate}) => {
    const [startFormattedDate,setStartFormattedDate]=useState<string>('');
    const [endFormattedDate, setEndFormattedDate] = useState<string>('');
    useEffect(()=>{
        setStartFormattedDate(formatDateTime(startDate));
        setEndFormattedDate(formatDateTime(endDate));
    },[])

    return (<div className="d-flex align-items-center me-2">
        <div className="symbol symbol-50px me-3">
            <div className="symbol-label bg-light-primary"><i className="ki-duotone ki-calendar fs-1 text-black"><span
                className="path1"></span><span className="path2"></span><span className="path3"></span><span
                className="path4"></span></i></div>
        </div>
        <div className={'min-w-100px'}>
            <div className={'d-flex'}>
                <div className="fs-4 text-success fw-demibold">Start: </div>
                <div className="ms-3 fs-7 text-muted fw-semibold">{startFormattedDate}</div>
            </div>
            <div className={'d-flex'}>
                <div className="fs-4 text-danger-emphasis fw-bold">End:</div>
                <div className="ms-3 fs-7 text-muted fw-semibold">{endFormattedDate}</div>
            </div>
        </div>
    </div>)
}
export {StartEndDateCell}