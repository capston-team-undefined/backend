import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Quiz } from "./quiz.entity";
import { QuizChoiceOption } from "./quiz_choice_option.entity";

@Entity({schema: "quiz", name: "quiz_details"})
export class QuizDetails  {
    @PrimaryGeneratedColumn("uuid")
    uuid: string;

    @ManyToOne(() => Quiz, (quiz) => quiz.details, { onDelete: "CASCADE" })
    @JoinColumn({ name: 'quiz_uuid' })
    quiz: Quiz | string ;

    @Column({ name: "question", type: "text" })
    question: string;

    @Column({ name: "answer", type: "text" })
    answer: string;

    @Column({ name: "type", type: "enum", enum: ["short_answer", "long_answer", "multiple_choice", "ox"] })
    type: 'short_answer' | 'long_answer' | 'multiple_choice' | 'ox';
    
    @OneToMany(() => QuizChoiceOption, (option) => option.quizDetail, { cascade: true })
    options: QuizChoiceOption[];
}
