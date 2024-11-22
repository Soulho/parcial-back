import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { BadRequestException, BusinessError, BusinessLogicException } from '../shared/business-errors';
import { InjectRepository } from '@nestjs/typeorm';
import { DiagnosticoEntity } from './diagnostico.entity';

@Injectable()
export class DiagnosticoService {
    constructor(
        @InjectRepository(DiagnosticoEntity)
        private readonly diagnosticoRepository: Repository<DiagnosticoEntity>
    ){}

    async findAll(): Promise<DiagnosticoEntity[]> {
        return await this.diagnosticoRepository.find({ relations: ["pacientes"] });
    }

    async findOne(id: string): Promise<DiagnosticoEntity> {
        const diagnostico: DiagnosticoEntity = await this.diagnosticoRepository.findOne({where: {id}, relations: ["pacientes"] } );
        if (!diagnostico)
          throw new BusinessLogicException("The diagnostico with the given id was not found", BusinessError.NOT_FOUND);
        return diagnostico;
    }

    async create(diagnostico: DiagnosticoEntity): Promise<DiagnosticoEntity> {
        const description = diagnostico.description;
        if (description.length > 200){
            throw new BadRequestException('The description must not exceed 200 characters', BusinessError.BAD_REQUEST);
        }
        return await this.diagnosticoRepository.save(diagnostico);
    }

    async delete(id: string) {
        const diagnostico: DiagnosticoEntity = await this.diagnosticoRepository.findOne({where:{id}});
        if (!diagnostico)
          throw new BusinessLogicException("The diagnostico with the given id was not found", BusinessError.NOT_FOUND);
     
        await this.diagnosticoRepository.remove(diagnostico);
    }
}
