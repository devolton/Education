import {Column, DataType, Model, Table} from "sequelize-typescript";
interface CreateNewsletterAttr{
    email:string;
}

@Table({tableName:'newsletters'})
export class Newsletter extends Model<Newsletter,CreateNewsletterAttr>{
    @Column({type:DataType.INTEGER, unique:true, autoIncrement:true, primaryKey:true})
    id:number;
    @Column({type:DataType.STRING(32), unique:true, allowNull:false})
    email:string;

}