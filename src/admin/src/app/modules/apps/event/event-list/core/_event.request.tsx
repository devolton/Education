import axios from "axios";
import {Config} from "../../../../../../env.config.ts";
import {ID} from "../../../../../../_metronic/helpers";
import {
    CreateEventDetailDto,
    CreateEventDto,
    CreateEventVenueDto, UpdateEventDetailDto,
    UpdateEventDto,
    UpdateEventVenueDto
} from "./_event.model.ts";

const getEvents=(query)=>{
    return axios.get(Config.PATH.SERVER.EVENTS_URL+`/admin?${query}`)
        .then(res=>{
            return res.data;
        })
}

const getEventById=(id:ID)=>{
    return axios.get(Config.PATH.SERVER.EVENTS_URL+`/by-id/${id}`)
        .then(res=>{
            return res.data;
        })
}
const createEvent=(createEventDto:CreateEventDto,
                   createEventVenueDto:CreateEventVenueDto,
                   createEventDetailDto:CreateEventDetailDto,
                   thumbnail:File=null,poster:File=null)=>{

    return  axios.post(Config.PATH.SERVER.EVENTS_URL,{
        event:createEventDto,
        event_venue:createEventVenueDto,
        event_detail:createEventDetailDto
    })
        .then(res=>{
            let eventId=res.data.id;
            if(eventId){
                if(thumbnail){
                    updateEventThumbnail(eventId,thumbnail);
                }
                if(poster){
                    updateEventPoster(eventId,poster);
                }
            }
        })

}

const updateEvent=(id:ID,
                   updateEventDto:UpdateEventDto,
                   updateEventVenueDto:UpdateEventVenueDto,
                   updateEventDetailDto:UpdateEventDetailDto)=>{
    return axios.put(Config.PATH.SERVER.EVENTS_URL+`/${id}`,{
        event:updateEventDto,
        event_venue:updateEventVenueDto,
        event_detail:updateEventDetailDto
    });
}
const updateEventThumbnail=(id:ID, thumbnail:File)=>{
    return axios.put(Config.PATH.SERVER.EVENTS_URL+`/thumbnail/${id}`,{thumbnail:thumbnail},{
        headers:{
            'Content-Type':'multipart/form-data'
        }
    })
}
const updateEventPoster=(id:ID, poster:File)=>{
    return axios.put(Config.PATH.SERVER.EVENTS_URL+`/poster/${id}`,{poster:poster},{
        headers:{
            'Content-Type':'multipart/form-data'
        }
    })
}

const removeEventById=(id:ID)=>{
    return axios.delete(Config.PATH.SERVER.EVENTS_URL+`/${id}`);
}

const removeEvents=(ids:Array<ID>)=>{
    const requests = ids.map(id=>axios.delete(Config.PATH.SERVER.EVENTS_URL+`/${id}`));
    return axios.all(requests);
}
const removeEventThumbnail=(id:ID)=>{
    return axios.delete(Config.PATH.SERVER.EVENTS_URL+`/thumbnail/${id}`);
}
const removeEventPoster=(id:ID)=>{
    return axios.delete(Config.PATH.SERVER.EVENTS_URL+`/poster/${id}`);
}




export {
    getEvents,
    getEventById,
    createEvent,
    updateEvent,
    updateEventPoster,
    updateEventThumbnail,
    removeEvents,
    removeEventById,
    removeEventPoster,
    removeEventThumbnail
}