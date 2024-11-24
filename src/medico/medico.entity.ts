/* eslint-disable prettier/prettier */
import { PacienteEntity } from "../paciente/paciente.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class MedicoEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    especialidad: string;

    @ManyToMany(() => PacienteEntity, (paciente) => paciente.medicos)
    @JoinTable()
    pacientes: PacienteEntity[];
}
