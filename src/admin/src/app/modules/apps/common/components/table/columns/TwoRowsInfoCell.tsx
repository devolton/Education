
import {FC} from 'react'
import {EmailMessage} from "../../../../message/message-list/core/_message.model.ts";


type Props = {
   upperStr:string,
    downStr
}

const TwoRowsInfoCell: FC<Props> = ({upperStr, downStr}) => (
    <div className='d-flex align-items-center'>
        <div className='d-flex flex-column'>
            <a href='#' className='text-gray-800 text-hover-primary mb-1'>
                {upperStr}
            </a>
            <span>{downStr}</span>
        </div>
    </div>
)

export {TwoRowsInfoCell}
