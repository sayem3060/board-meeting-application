import { Entity, Column } from "typeorm";
import { BaseEntity } from "../../../common/entities/base.entity";

@Entity("permissions")
export class Permission extends BaseEntity {

    @Column({ type: "varchar", length: 100, unique: true })
    permission_name: string;

    @Column({ type: "text", nullable: true })
    description: string | null;

    @Column({ type: "boolean", default: true })
    is_active: boolean;
    

}