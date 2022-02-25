import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Contact {
  @PrimaryGeneratedColumn({
    type: 'int',
    comment: 'primary key',
  })
  id: number;

  @Column({
    type: 'varchar',
    name: 'name',
    comment: 'name',
  })
  name: string;

  @Column({
    type: 'varchar',
    name: 'phone',
    comment: 'phone',
  })
  phone: string;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'created_at',
    comment: 'created time',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    name: 'updated_at',
    comment: 'updated time',
  })
  updatedAt: Date;
}
