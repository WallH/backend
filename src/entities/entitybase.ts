import { BaseEntity, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

export abstract class EntityBase extends BaseEntity{
    
	@Column({primary: true, generated: true})
	id:number;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;
}