import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Quiz } from "./quiz.entity";

@Entity({schema:"quiz", name: "tag"})
export class QuizTag{
    @PrimaryGeneratedColumn("uuid")
    uuid: string


    @Column({name: "tag", type: "text"})
    tag: string

    @ManyToOne(() => Quiz, (quiz) => quiz.tag, { onDelete: "CASCADE" })
    @JoinColumn({ name: 'quiz_uuid' })
    quiz: Quiz | string ;
}