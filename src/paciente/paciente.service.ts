import { Injectable } from '@nestjs/common';
import { PacienteEntity } from './paciente.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException, BusinessError, BusinessLogicException } from '../shared/business-errors';
import { Repository } from 'typeorm';

@Injectable()
export class PacienteService {
    constructor(
        @InjectRepository(PacienteEntity)
        private readonly pacienteRepository: Repository<PacienteEntity>
    ){}

    async findAll(): Promise<PacienteEntity[]> {
        return await this.pacienteRepository.find({ relations: ["medicos", "diagnosticos"] });
    }

    async findOne(id: string): Promise<PacienteEntity> {
        const paciente: PacienteEntity = await this.pacienteRepository.findOne({where: {id}, relations: ["medicos", "diagnosticos"] } );
        if (!paciente)
          throw new BusinessLogicException("The paciente with the given id was not found", BusinessError.NOT_FOUND);
        return paciente;
    }

    async create(paciente: PacienteEntity): Promise<PacienteEntity> {
        const name = paciente.name;
        if (name.length <= 3){
            throw new BadRequestException('The patient name must be 3 characters', BusinessError.BAD_REQUEST);
        }
        return await this.pacienteRepository.save(paciente);
    }

    async delete(id: string) {
        const paciente: PacienteEntity = await this.pacienteRepository.findOne({where:{id}});
        if (!paciente)
          throw new BusinessLogicException("The paciente with the given id was not found", BusinessError.NOT_FOUND);
        
        const diagnosticos = paciente.diagnosticos;
        
        if(diagnosticos.length === 0){
            throw new BadRequestException("The patient has diagnosis", BusinessError.BAD_REQUEST);
        }

        await this.pacienteRepository.remove(paciente);
    }
}
