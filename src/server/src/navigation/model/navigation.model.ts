import {Column, DataType, Model, Table} from "sequelize-typescript";
interface NavigationCreateAttr{
    href:string;
    title:string;
    order:number;
    parentId:number;

}

@Table({tableName:'navigations'})
export class Navigation extends Model<Navigation,NavigationCreateAttr>{
    @Column({type:DataType.INTEGER, unique:true, autoIncrement:true, primaryKey:true})
    id:number;
    @Column({type:DataType.STRING, unique:true, allowNull:false})
    href:string;
    @Column({type:DataType.STRING, unique:true, allowNull:false})
    title:string;
    @Column({type:DataType.INTEGER, allowNull:false})
    order:number;
    @Column({type:DataType.INTEGER, allowNull:true})
    parentId:number;

}