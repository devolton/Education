import {FC, useEffect, useState} from "react";
import {changeMessageState} from "../../../../message/message-list/core/_message.request.ts";

type Props = {
    checkingState: boolean,
    entityId: number,
    changeStateHandler?: (id: number) => void
}
const SwitcherCell: FC<Props> = ({checkingState, entityId, changeStateHandler = null}) => {
    const [isChecked, setIsChecked] = useState<boolean>(false);
    useEffect(() => {
        setIsChecked(checkingState);
    }, [])
    const onChange = () => {
        setIsChecked(!isChecked);
        if (changeStateHandler)
            changeStateHandler(entityId);
    }
    return (
        <div className="form-check form-switch">
            <input className="form-check-input"
                   type="checkbox"
                   id="flexSwitchCheckChecked"
                   onChange={onChange}
                   checked={isChecked}
                   disabled={isChecked}/>
        </div>
    )
}
export {SwitcherCell}