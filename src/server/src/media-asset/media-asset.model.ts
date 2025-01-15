import {Column, DataType, Model, Table} from "sequelize-typescript";

interface MediaAssetCreateAttr{
    name:string;
    path:string;
    category:string;
    alt:string;
}

@Table({tableName:'media_assets'})
export class MediaAsset extends Model<MediaAsset,MediaAssetCreateAttr>{
    @Column({type:DataType.INTEGER, unique:true,autoIncrement:true, primaryKey:true})
    id:number;
    @Column({type:DataType.STRING, allowNull:false, unique:true})
    name:string;
    @Column({type:DataType.STRING, allowNull:false, unique:true})
    path:string;
    @Column({type:DataType.STRING, allowNull:true})
    category:string;
    @Column({type:DataType.STRING, allowNull:false, unique:false, defaultValue:'image'})
    alt:string;


}