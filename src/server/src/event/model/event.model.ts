import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import EventDetail from "./eventDetail.model";
import {EventVenue} from "./eventVenue.model";
import {EventStatus} from "../event.status.enum";
interface EventCreateAttr{
    title:string;
    shortDescription:string;
    fullDescription:string;
    thumbnailPath:string;
    posterPath:string;
    status:string;
    eventDetailId:number;
    eventVenueId:number;
}
@Table({tableName:'events'})
export class Event extends Model<Event,EventCreateAttr>{
    @Column({type:DataType.INTEGER, unique:true, autoIncrement:true, primaryKey:true})
    id:number;
    @Column({type:DataType.STRING, allowNull:false})
    title:string;
    @Column({type:DataType.STRING(256), allowNull:false})
    shortDescription:string;
    @Column({type:DataType.STRING(2048),allowNull:false})
    fullDescription:string;
    @Column({type:DataType.STRING(1048),allowNull:false})
    thumbnailPath:string;
    @Column({type:DataType.STRING(1048), allowNull:false})
    posterPath:string;
    @Column({type:DataType.ENUM(...Object.values(EventStatus)), allowNull:false, defaultValue:EventStatus.PLANNED})
    status:EventStatus;
    @Column({type:DataType.STRING(64),allowNull:false, unique:true})
    slug:string;

    @ForeignKey(()=>EventDetail)
    @Column({type:DataType.INTEGER})
    eventDetailId:number;
    @BelongsTo(()=>EventDetail)
    eventDetail:EventDetail;
    @ForeignKey(()=>EventVenue)
    @Column({type:DataType.INTEGER})
    eventVenueId:number;
    @BelongsTo(()=>EventVenue)
    eventVenue:EventVenue;


}