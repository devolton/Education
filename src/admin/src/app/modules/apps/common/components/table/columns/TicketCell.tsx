import {ColorCell} from "../ColorCell.tsx";
import {FC} from "react";

type Props = {
    freeTickets: number,
    allTickets: number
}
const TicketCell: FC<Props> = ({freeTickets, allTickets}) => {

    return (
        <div className="d-flex align-items-center me-2">
            <div className="symbol symbol-50px me-3">
                <div className="symbol-label bg-light-danger"><i
                    className="ki-duotone ki-note fs-1 text-black"><span
                    className="path1"></span><span className="path2"></span><span className="path3"></span><span
                    className="path4"></span></i></div>
            </div>
            <div className={'min-w-100px'}>
                <div className={'d-flex me-2'}>
                    <div className="fs-5 text-danger-emphasis fw-light me-3">Free:</div>
                    <ColorCell value={freeTickets} back={'success'}/>
                </div>
                <div className={'d-flex'}>
                    <div className="fs-5 text-danger-emphasis fw-light me-3">All:</div>
                    <ColorCell value={allTickets} back={'warning'}/>

                </div>
            </div>
        </div>
    )
}
export {TicketCell}