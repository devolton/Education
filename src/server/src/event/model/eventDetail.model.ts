import {BelongsTo, Column, DataType, ForeignKey, HasOne, Model, Table} from "sequelize-typescript";
import {Event} from "./event.model";

interface EventDetailCreateAttr{
    company:string;
    ticketPrice:number;
    numberOfPlaces:number;
    freePlaces:number;

}
@Table({tableName:'event_details'})
export default class EventDetail extends Model<EventDetail,EventDetailCreateAttr>{
    @Column({type:DataType.INTEGER,unique:true, autoIncrement:true, primaryKey:true})
    id:number;
    @Column({type:DataType.STRING, allowNull:false, defaultValue:'DEVOLTON LABS'})
    company:string;
    @Column({type:DataType.INTEGER, allowNull:true})
    ticketPrice:number;
    @Column({type:DataType.INTEGER, allowNull:false})
    numberOfPlaces:number;
    @Column({type:DataType.INTEGER,allowNull:false})
    freePlaces:number;
    @HasOne(()=>Event)
    event:Event;


}