import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';

@Entity('committees')
export class Committee extends BaseEntity {
    @Column({ type: 'varchar', length: 150, unique: true })
    committee_name: string;

    @Column({ type: 'text', nullable: true })
    description: string | null;

    @Column({ type: 'boolean', default: true })
    is_active: boolean;
}