import { PacienteEntity } from "../paciente/paciente.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class DiagnosticoEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @ManyToMany(() => PacienteEntity, (paciente) => paciente.diagnosticos)
    pacientes: PacienteEntity[];
}
