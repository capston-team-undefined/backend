import { Quiz } from "src/entities/quiz.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Likes } from "./quiz_like.entity";

@Entity({schema : "quiz", name : "user"})
export class User {
    @PrimaryGeneratedColumn("uuid")
    uuid : string;

    @Column({name : "id", type : "varchar", length : 30, unique : true})
    id : string;

    @Column({name : "name", type : "varchar", length : 10, unique : true})
    name : string;

    @Column({name : "email", type : "varchar", length : 100, unique : true})
    email : string;

    @Column({name : "password", type : "text"})
    password : string;  

    @Column({name : "salt", type : "text"})
    salt : string;

    @OneToMany(()=>Quiz,(quiz)=>quiz.user,{cascade : true})
    quiz : Quiz[] | string

    @OneToMany(() => Likes, likes => likes.user)
    likes: Likes[];

}
