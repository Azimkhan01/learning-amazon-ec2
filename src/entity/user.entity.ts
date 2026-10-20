import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('users')
export class User{

    @PrimaryGeneratedColumn("increment")
    id:number

    @Column({length:50})
    name:string

    @Column({length:50,unique:true})
    email:string

    @Column()
    password:string
    
    @CreateDateColumn()
    createdAt:Date

    @UpdateDateColumn()
    updatedAt:Date
}