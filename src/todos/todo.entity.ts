import {BaseEntity, Column, Entity, IsNull, PrimaryGeneratedColumn} from 'typeorm';
import {IsString, MaxLength, MinLength} from 'class-validator';

@Entity()
export class Todo extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({length: 150})
  @MinLength(1)
  @MaxLength(150)
  @IsString()
  title: string;

  @Column()
  @MinLength(1)
  @IsString()
  description: string;

  @Column('boolean', {default: false})
  isDone = false;
}