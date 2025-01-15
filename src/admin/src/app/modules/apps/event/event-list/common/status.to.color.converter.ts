import {EventStatus} from "../core/_event.model.ts";
import {ColorBack} from "../../../../../../_metronic/helpers";

const statusToColorConverter=(eventStatus:EventStatus):ColorBack=>{
    switch (eventStatus){
        case EventStatus.CANCELED:{
            return 'danger';
        }
        case EventStatus.IN_PROGRESS:{
            return 'warning';
        }
        case EventStatus.COMPLETED:{
            return 'success';
        }
        case EventStatus.PLANNED:{
            return 'primary';
        }
        default:{
            return 'danger';
        }
    }
}
export {statusToColorConverter}