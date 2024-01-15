import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../auth/auth.entity';
import { Produk } from '../produk/produk.entity';

@Entity()
export class Kategori extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  nama_kategori: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'created_by' }) //buat relasi many to one  dengan table user
  created_by: User;

  @OneToMany(() => Produk, (v) => v.kategori)
  produk: Produk[];

  @ManyToOne(() => User)
  @JoinColumn({ name: 'updated_by' }) //buat relasi many to one  dengan table user
  updated_by: User;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
