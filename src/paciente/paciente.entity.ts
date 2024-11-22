import { MedicoEntity } from "../medico/medico.entity";
import { DiagnosticoEntity } from "../diagnostico/diagnostico.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PacienteEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    genero: string;

    @ManyToMany(() => DiagnosticoEntity, (diagnostico) => diagnostico.pacientes)
    @JoinTable()
    diagnosticos: DiagnosticoEntity[];

    @ManyToMany(() => MedicoEntity, (medico) => medico.pacientes)
    medicos: MedicoEntity[];
}
