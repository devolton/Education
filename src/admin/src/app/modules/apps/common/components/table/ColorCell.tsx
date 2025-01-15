
import {FC} from 'react'
import {ColorBack} from "../../../../../../_metronic/helpers";


type Props = {
    value?: any,
    back?: ColorBack

}

const ColorCell: FC<Props> = ({value,back='success'}) => (
    <> {value && <div className={` badge badge-light-${back} fw-bolder`}>{value}</div>}</>
)

export {ColorCell}
