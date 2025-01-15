import {Model, Table, Column, DataType} from "sequelize-typescript";

interface OptionCreateAttr {
    name: string;
    value: string;
    relation: string;
}

@Table({tableName:'options'})
export class Option extends Model<Option, OptionCreateAttr> {
    @Column({type:DataType.INTEGER, unique:true, autoIncrement:true, primaryKey:true})
    id:number;

    @Column({type:DataType.STRING, allowNull:false})
    name:string;

    @Column({type:DataType.STRING, allowNull:false})
    value:string;

    @Column({type:DataType.STRING, allowNull:true})
    relation: string;


}