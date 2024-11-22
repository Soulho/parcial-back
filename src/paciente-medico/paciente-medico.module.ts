import { Module } from '@nestjs/common';
import { PacienteMedicoService } from './paciente-medico.service';
import { PacienteEntity } from '../paciente/paciente.entity';
import { MedicoEntity } from '../medico/medico.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([PacienteEntity, MedicoEntity])],
  providers: [PacienteMedicoService]
})
export class PacienteMedicoModule {}
