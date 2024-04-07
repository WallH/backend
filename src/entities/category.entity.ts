import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { EntityBase } from "./entitybase";
import { Product } from "./product.entity";

@Entity()
export class Category extends EntityBase {
    @Column()
    nombre: string;

    @Column()
    descripcion: string;

    @Column()
    activa: boolean;

    @OneToMany(() => Product, (product) => product.categoria)
    productos: Product[];
}