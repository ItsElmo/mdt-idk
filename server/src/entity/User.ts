import { Field, ObjectType } from 'type-graphql';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
@ObjectType()
@Entity()
export class User extends BaseEntity {
	@PrimaryGeneratedColumn()
	id!: number;
	@Field()
	@Column()
	username: string;
	@Field()
	@Column()
	character: string;
	@Column()
	password: string;
}
