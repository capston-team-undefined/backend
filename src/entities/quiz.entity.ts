import { User } from "src/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { QuizDetails } from "./quiz_details.entity";
import { QuizTag } from "./quiz_tag.entity";
import { Likes } from "./quiz_like.entity";

@Entity({schema: "quiz", name: "quiz"})
export class Quiz {
    @PrimaryGeneratedColumn("uuid",)
    uuid: string;

    @Column({name: "title", type: "varchar", length: 100})
    title: string;

    @Column({name : "img", type : "text",nullable : false})
    img : string;

    @Column({ name: "type", type: "enum", enum: ["자격증/취업", "취업", "중고등", "언어/외국어","기타"] })
    type: '자격증/취업' | '취업' | '중고등' | '언어/외국어' | '기타';

    @ManyToOne(()=>User,(user)=>user.quiz, {onDelete : "CASCADE"})
    @JoinColumn({ name: 'user' }) // 외래 키 컬럼명 지정
    user : User | string

    @Column({name: "createdAt", type: "datetime"})
    createdAt: Date
    
    @OneToMany(() => QuizDetails, (details) => details.quiz)
    details: QuizDetails[];

    @OneToMany(() => QuizTag, (tag) => tag.quiz)
    tag: QuizTag[];

    @OneToMany(() => Likes, likes => likes.quiz)
    likes: Likes[];
}
