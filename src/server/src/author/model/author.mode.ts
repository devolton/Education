import {Model, Table, Column, DataType, HasOne, HasMany} from "sequelize-typescript";
import {AuthorPositionEnum} from "../author.position.enum";
import {Post} from "../../post/model/post.model";

interface CreatAuthorAttr{
    fullName:string;
    avatarPath:string;
    instagramHref:string;
    facebookHref:string
    twitterHref:string;
    slogan:string;
    position:AuthorPositionEnum;
}

@Table({tableName:'authors'})
export class Author extends Model<Author, CreatAuthorAttr>{
    @Column({type:DataType.INTEGER, unique:true, autoIncrement:true, primaryKey:true})
    id:number;
    @Column({type:DataType.STRING(32), allowNull:false})
    fullName:string;
    @Column({type:DataType.STRING(256), allowNull:true})
    avatarPath:string;
    @Column({type:DataType.STRING(128), allowNull:true})
    instagramHref:string;
    @Column({type:DataType.STRING(128), allowNull:true})
    facebookHref:string;
    @Column({type:DataType.STRING(128), allowNull:true})
    twitterHref:string;
    @Column({type:DataType.STRING(256), allowNull:false})
    slogan:string;


    @Column({type:DataType.ENUM(...Object.values(AuthorPositionEnum)), allowNull:false, defaultValue:AuthorPositionEnum.TRAINER})
    position:AuthorPositionEnum;

    @HasMany(()=>Post)
    posts:Post[];


}