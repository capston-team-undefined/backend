import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { QuizDetails } from './quiz_details.entity';

@Entity({ schema: "quiz", name: "multiple_choice_options" })
export class QuizChoiceOption {
    @PrimaryGeneratedColumn("uuid")
    uuid: string;

    @ManyToOne(() => QuizDetails, (quizDetail) => quizDetail.options, { onDelete: "CASCADE" })
    @JoinColumn({ name: 'quiz_detail_uuid' })
    quizDetail: QuizDetails | string ;

    @Column({ name: "option_text", type: "text" })
    optionText: string;

    @Column({ name: "is_correct", type: "boolean", default: false })
    isCorrect: boolean;
}
