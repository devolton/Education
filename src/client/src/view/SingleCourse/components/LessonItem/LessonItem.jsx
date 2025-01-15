import * as React from "react";
import ModalWindow from "../../../Common/components/ModalWindow/ModalWindow";

export default function LessonItem({lesson}) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (<li className="justify-content-between d-flex">
        <p>{lesson.title}</p>
        <a className="primary-btn text-uppercase" onClick={handleOpen} type={'button'}>View Details</a>
        <ModalWindow description={lesson.description} title={lesson.title} open={open} handleClose={handleClose}/>
    </li>)
}