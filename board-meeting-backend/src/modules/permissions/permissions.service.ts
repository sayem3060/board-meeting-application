import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, IsNull, In } from "typeorm";
import { Permission } from "./entities/permissions.entity";
import { CreatePermissionDto } from "./dtos/create-permission.dto";

@Injectable()
export class PermissionsService {
    constructor(
        @InjectRepository(Permission)
        private permissionsRepository: Repository<Permission>,
    ) {}

    async create(createPermissionDto: CreatePermissionDto) {
        const permission = this.permissionsRepository.create(createPermissionDto);
        return await this.permissionsRepository.save(permission);
    }     

    async findAll() {
        return await this.permissionsRepository.find({
            where: { deleted_at: IsNull() },
        });
    }

    async findOne(id: string) {
        return await this.permissionsRepository.findOne({
            where: { id, deleted_at: IsNull() },
        });

    }

    async update(id: string, updatePermissionDto: Partial<CreatePermissionDto>) {
        await this.permissionsRepository.update(id, updatePermissionDto);
        return await this.findOne(id);
    }   

    async remove(id: string) {
        const permission = await this.findOne(id);              
        if (permission) {
            permission.softDelete();
            return await this.permissionsRepository.save(permission);
        }
        return null;
    }
    
    async findByNames(names: string[]) {
        return await this.permissionsRepository.find({
            where: {
                permission_name: In(names),
                deleted_at: IsNull(),
            },
        });
    }
}