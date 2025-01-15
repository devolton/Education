import {FC} from 'react'
import {ColorCell} from "../ColorCell.tsx";
import {ColorBack, SelectMappingEntity} from "../../../../../../../_metronic/helpers";

type Props = {
    collection:Array<SelectMappingEntity>,
    back:ColorBack

}

const MappingCell: FC<Props> = ({collection,back}) =>
    <div>
        {
            collection.map((item)=>{
                return ( <ColorCell key={`color-cell-${item.id}-${item.title}`} value={item.title} back={back}/>
                )
            })
        }
    </div>


export {MappingCell}