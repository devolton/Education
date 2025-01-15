import {FC} from "react";

type Props = {
  keyValueCollection:Record<string, any>
}


const KeyValueInfoCell: FC<Props> = ({keyValueCollection}) => {


    return (
        <div>
            {
                Object.entries(keyValueCollection).map(([key,value])=>{
                    return(<div key={`key-value-${key}-${value}`}>
                        <span className="text-muted text-decoration-underline fw-semibold d-block fs-8">{key}</span>
                        <span className="text-gray-900 fw-bold d-block fs-7">{value}</span>
                    </div>)
            })
            }

        </div>
    )

}
export {KeyValueInfoCell}