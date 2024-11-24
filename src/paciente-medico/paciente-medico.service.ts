/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PacienteEntity } from '../paciente/paciente.entity';
import { MedicoEntity } from '../medico/medico.entity';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from '../shared/business-errors';

@Injectable()
export class PacienteMedicoService {
    constructor(
        @InjectRepository(PacienteEntity)
        private readonly pacienteRepository: Repository<PacienteEntity>,
    
        @InjectRepository(MedicoEntity)
        private readonly medicoRepository: Repository<MedicoEntity>
    ) {}

    async addMedicoPaciente(pacienteId: string, medicoId: string): Promise<PacienteEntity> {
        const medico: MedicoEntity = await this.medicoRepository.findOne({where: {id: medicoId}});
        if (!medico)
          throw new BusinessLogicException("The medico with the given id was not found", BusinessError.NOT_FOUND);
      
        const paciente: PacienteEntity = await this.pacienteRepository.findOne({where: {id: pacienteId}, relations: ["medicos"]})
        if (!paciente)
          throw new BusinessLogicException("The paciente with the given id was not found", BusinessError.NOT_FOUND);
        
        const medicosPaciente = paciente.medicos;
        if(medicosPaciente.length >= 5)
            throw new BusinessLogicException("The paciente has 5 or more medicos", BusinessError.PRECONDITION_FAILED);

        paciente.medicos = [...paciente.medicos, medico];
        return await this.pacienteRepository.save(paciente);
      }
}
