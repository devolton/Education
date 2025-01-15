import {BelongsTo, Column, DataType, ForeignKey, HasOne, Model, Table} from "sequelize-typescript";
import {Event} from "./event.model";

interface EventVenueCreateAttr {
    startDate:Date;
    endDate:Date;
    city:string;
    street:string;
}

@Table({tableName: 'event_venues'})
export class EventVenue extends Model<EventVenue, EventVenueCreateAttr> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;
    @Column({type: DataType.DATE, allowNull: false})
    startDate: Date;
    @Column({type: DataType.DATE, allowNull: false})
    endDate: Date;
    @Column({type: DataType.STRING(32), allowNull: false, defaultValue: 'Poltava'})
    city: string;
    @Column({type: DataType.STRING(128), allowNull: false, defaultValue: 'Sobornosty 2a'})
    street: string;
    @HasOne(() => Event)
    event: Event;


}