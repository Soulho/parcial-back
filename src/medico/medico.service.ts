import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MedicoEntity } from './medico.entity';
import { Repository } from 'typeorm';
import { BadRequestException, BusinessError, BusinessLogicException } from '../shared/business-errors';

@Injectable()
export class MedicoService {
    constructor(
        @InjectRepository(MedicoEntity)
        private readonly medicoRepository: Repository<MedicoEntity>
    ){}

    async findAll(): Promise<MedicoEntity[]> {
        return await this.medicoRepository.find({ relations: ["pacientes"] });
    }

    async findOne(id: string): Promise<MedicoEntity> {
        const medico: MedicoEntity = await this.medicoRepository.findOne({where: {id}, relations: ["pacientes"] } );
        if (!medico)
          throw new BusinessLogicException("The medico with the given id was not found", BusinessError.NOT_FOUND);
        return medico;
    }

    async create(medico: MedicoEntity): Promise<MedicoEntity> {
        const name = medico.name;
        const especialidad = medico.especialidad;
        if (name.trim() === ''){
            throw new BadRequestException('The name can not be empty', BusinessError.BAD_REQUEST);
        }
        if (especialidad.trim() === ''){
            throw new BadRequestException('The especialidad can not be empty', BusinessError.BAD_REQUEST);
        }
        return await this.medicoRepository.save(medico);
    }

    async delete(id: string) {
        const medico: MedicoEntity = await this.medicoRepository.findOne({where:{id}});
        if (!medico)
          throw new BusinessLogicException("The medico with the given id was not found", BusinessError.NOT_FOUND);

        const pacientes = medico.pacientes;
        
        if(pacientes.length === 0){
            throw new BadRequestException("The medico has patients", BusinessError.BAD_REQUEST);
        }
        await this.medicoRepository.remove(medico);
    }

}
