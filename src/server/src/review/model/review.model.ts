import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {User} from "../../user/model/user.model";
import {Course} from "../../course/model/course.model";

interface ReviewCreationAttr{
    review:string;
    rating:number;
    userId:number;
    courseId:number;
}
@Table({tableName:'reviews'})
export class Review extends Model<Review,ReviewCreationAttr>{
    @Column({type:DataType.INTEGER, unique:true, autoIncrement:true, primaryKey:true})
    id:number;
    @Column({type:DataType.STRING,allowNull:false})
    review:string;
    @Column({type:DataType.STRING, allowNull:false})
    rating:number;
    @ForeignKey(()=>User)
    @Column({type:DataType.INTEGER})
    userId:number;
    @BelongsTo(()=>User)
    author:User;

    @ForeignKey(()=>Course)
    @Column({type:DataType.INTEGER})
    courseId:number;
    @BelongsTo(()=>Course)
    course:Course;


}