import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../user/user.entity';
import { EntryTypes } from '../entry-types/entry-types.entity';

@Entity()
export class Entries extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'float' })
  amount: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(type => User, user => user.entries, { eager: false })
  user: User;

  @Column()
  userId: string;

  @ManyToOne(type => EntryTypes, entryTypes => entryTypes, { eager: true })
  entryTypes: EntryTypes;
}
