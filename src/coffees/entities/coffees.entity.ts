import { type } from "os";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { FlavoursEntity } from "./flavours.entity";

@Entity() //sql table name same as of class name in smaller letters
export class Coffee{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    brand: string;

    // @Column('json' , {nullable:true})
    // flavours:string[]

    @JoinTable()
    @ManyToMany(
        type => FlavoursEntity,
        flavours => flavours.coffees,
        {
            cascade:true
        }
    )
    flavours: FlavoursEntity[];
}