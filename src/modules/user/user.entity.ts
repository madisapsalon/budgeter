import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Entries } from '../entries/entries.entity';
import { EntryTypes } from '../entry-types/entry-types.entity';

@Entity()
@Unique(['email'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({})
  email: string;

  @Column()
  password: string;

  @Column({ default: null })
  name: string;

  @Column()
  salt: string;

  @OneToMany(type => Entries, entries => entries.user, { eager: true })
  entries: Entries[];

  @OneToMany(type => EntryTypes, entryTypes => entryTypes.user, { eager: true })
  entryTypes: EntryTypes[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
