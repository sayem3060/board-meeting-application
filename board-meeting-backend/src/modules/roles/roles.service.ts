import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, IsNull, In } from "typeorm";
import { Role } from "./entities/roles.entity";
import { CreateRoleDto } from "./dto/create-role.dto";

@Injectable()
export class RolesService {
    constructor(
        @InjectRepository(Role)
        private rolesRepository: Repository<Role>,
    ) {}

    async create(createRoleDto: CreateRoleDto) {
        const role = this.rolesRepository.create(createRoleDto);
        return await this.rolesRepository.save(role);
    }

    async findAll() {
        return await this.rolesRepository.find({
            where: { deleted_at: IsNull() },
        });
    }               

    async findOne(id: string) {
        return await this.rolesRepository.findOne({ 
            where: { id, deleted_at: IsNull() },
        });
    }

    async update(id: string, updateRoleDto: Partial<CreateRoleDto>) {
        await this.rolesRepository.update(id, updateRoleDto);
        return await this.findOne(id);
    }   

    async remove(id: string) {
        const role = await this.findOne(id);
        if (role) {
            role.softDelete();
            return await this.rolesRepository.save(role);
        }   
        return null;
    }
    
    async findByNames(names: string[]) {    
        return await this.rolesRepository.find({
            where: {
                role_name: In(names),
                deleted_at: IsNull(),
            },
        });
    }
}