import { type } from "os";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Coffee } from "./coffees.entity";


@Entity()
export class FlavoursEntity { 
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToMany(
        type => Coffee,
        coffee => coffee.flavours,
    )
    coffees: Coffee[];
}
