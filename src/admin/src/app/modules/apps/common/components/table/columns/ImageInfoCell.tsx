
import clsx from 'clsx'
import {FC} from 'react'
import {toDevoltonAbsoluteUrl} from "../../../../../../../_metronic/helpers";


type Props = {
    imagePath?:string,
    upperSpanValue:string,
    downSpanValue:string


}

const ImageInfoCell: FC<Props> = ({upperSpanValue,downSpanValue,imagePath=null}) => (
    <div className='d-flex align-items-center'>
        {/* begin:: Avatar */}
        <div className='symbol symbol-circle symbol-50px overflow-hidden me-3'>
            <a href='#'>
                {imagePath ? (
                    <div className='symbol-label'>
                        <img src={toDevoltonAbsoluteUrl(imagePath)} alt={upperSpanValue} className='w-100' />
                    </div>
                ) : (
                    <div
                        className={clsx(
                            'symbol-label fs-3',
                            `bg-light-`,
                            `text-primary`
                        )}
                    >
                        Av
                    </div>
                )}
            </a>
        </div>
        <div className='d-flex flex-column'>
            <a href='#' className='text-gray-800 text-hover-primary mb-1'>
                {upperSpanValue}
            </a>
            <span>{downSpanValue}</span>
        </div>
    </div>
)

export {ImageInfoCell}
