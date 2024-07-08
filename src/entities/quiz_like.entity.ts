import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Quiz } from "./quiz.entity";
import { User } from "./user.entity";

@Entity({ schema: 'quiz', name: 'likes' })
export class Likes {
    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @ManyToOne(() => User, user => user.likes, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_uuid' })
    user: User | string;

    @ManyToOne(() => Quiz, quiz => quiz.likes, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'quiz_uuid' })
    quiz: Quiz | string;

}