import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MuseumModule } from './museum/museum.module';
import { PacienteMedicoModule } from './paciente-medico/paciente-medico.module';
import { DiagnosticoModule } from './diagnostico/diagnostico.module';
import { PacienteModule } from './paciente/paciente.module';
import { MedicoModule } from './medico/medico.module';
import { MuseumModule } from './museum/museum.module';

@Module({
  imports: [MuseumModule, MedicoModule, PacienteModule, DiagnosticoModule, PacienteMedicoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
