import { Column, Entity, ManyToOne, OneToMany, OneToOne, Unique } from "typeorm";
import { Category } from "./category.entity";
import { EntityBase } from "./entitybase";

export enum ETalles
{
    SMALL,
    MEDIUM,
    LARGE,
    EXTRA_LARGE
}

@Entity()
export class Product extends EntityBase {

    @Column({ unique: true })
    codigo: string;

    @Column()
    nombre: string;

    @Column()
    precio: number;

    @Column()
    talle:ETalles;

    @ManyToOne(() => Category, (category) => category.productos, { eager: true })
    categoria: Category;

}