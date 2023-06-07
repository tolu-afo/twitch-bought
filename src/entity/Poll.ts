import { Entity, PrimaryGeneratedColumn, Column, Collection } from "typeorm";
import "reflect-metadata";

@Entity()
export class Poll {
    @PrimaryGeneratedColumn()
    id: number
    
    @Column()
    question: string

    @Column()
    option1: string

    @Column()
    option2: string

    @Column({default:0})
    count1: number

    @Column({default:0})
    count2: number

    @Column({default: false})
    is_over: boolean
}