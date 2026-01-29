import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, IsNull } from "typeorm";
import { Committee } from "./entities/committees.entity";
import { CreateCommitteeDto } from "./dto/create-committee.dto";

@Injectable()
export class CommitteesService {
    constructor(
        @InjectRepository(Committee)
        private committeesRepository: Repository<Committee>,
    ) {}    

    async create(createCommitteeDto: CreateCommitteeDto) {
        const committee = this.committeesRepository.create(createCommitteeDto);
        return await this.committeesRepository.save(committee);
    }   

    async findAll() {  
        return await this.committeesRepository.find({
            where: { deleted_at: IsNull() },
        });
    }

    async findOne(id: string) {
        return await this.committeesRepository.findOne({
            where: { id, deleted_at: IsNull() },
        });
    }   

    async update(id: string, updateCommitteeDto: Partial<CreateCommitteeDto>) {
        await this.committeesRepository.update(id, updateCommitteeDto);
        return await this.findOne(id);
    }

    async remove(id: string) {
        const committee = await this.findOne(id);
        if (committee) {
            committee.softDelete();
            return await this.committeesRepository.save(committee);
        }   
        return null;
    }
}