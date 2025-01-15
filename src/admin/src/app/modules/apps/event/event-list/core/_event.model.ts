import {ID} from "../../../../../../_metronic/helpers";
import {Config} from "../../../../../../env.config.ts";

export enum EventStatus{
    PLANNED = 'planned',
    IN_PROGRESS = 'in_progress',
    COMPLETED = 'completed',
    CANCELED='canceled'
}
export type EventVenue={
    id:ID,
    startDate:Date,
    endDate:Date,
    city:string,
    street:string
}
export type EventDetail={
    id:ID,
    company:string,
    ticketPrice:number,
    numberOfPlaces:number,
    freePlaces:number
}
export type Event ={
    id:ID,
    title:string,
    fullDescription:string,
    shortDescription:string,
    thumbnailPath:string,
    posterPath:string,
    status:EventStatus,
    slug:string
    eventDetail?:EventDetail,
    eventDetailId:ID,
    eventVenue?:EventVenue,
    eventVenueId:ID
}

export const initialEventVenue:EventVenue={
    id:undefined,
    city:'New-York',
    street:'Main Avenue 2',
    startDate: new Date(2025,6,10,12,0,0,0),
    endDate:new Date(2025,6,12,12,0,0,0)
}
export const initialEventDetail:EventDetail={
    id:undefined,
    ticketPrice:20,
    company:'Devolton Labs',
    freePlaces:20,
    numberOfPlaces:20
}
export const initialEvent:Event={
    id:undefined,
    title:"Event",
    shortDescription:"",
    fullDescription:"",
    thumbnailPath:Config.PATH.ASSETS.EVENT.DEFAULT_THUMBNAIL,
    posterPath:Config.PATH.ASSETS.EVENT.DEFAULT_POSTER,
    status:EventStatus.PLANNED,
    slug:'event',
    eventDetail:{
        ...initialEventDetail
    },
    eventVenue:{
        ...initialEventVenue
    },
    eventDetailId:undefined,
    eventVenueId:undefined
}

export type CreateEventDetailDto={
    company:string,
    ticketPrice:number,
    numberOfPlaces:number
}
export type CreateEventVenueDto={
    startDate:Date,
    endDate:Date,
    city:string,
    street:string

}
export type CreateEventDto={
    title:string,
    fullDescription:string,
    shortDescription:string,
    slug:string,
    posterPath:string,
    thumbnailPath:string

}

export type UpdateEventDto={
    title:string,
    shortDescription:string,
    fullDescription:string,
    slug:string

}
export type UpdateEventDetailDto={
    ticketPrice:number,
    numberOfPlaces:number,
    company:string

}
export type UpdateEventVenueDto={
    startDate:Date,
    endDate:Date,
    city:string,
    street:string
}