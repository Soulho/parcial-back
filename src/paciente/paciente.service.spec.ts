import { Test, TestingModule } from '@nestjs/testing';
import { PacienteService } from './paciente.service';
import { Repository } from 'typeorm';
import { PacienteEntity } from './paciente.entity';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';

describe('PacienteService', () => {
  let service: PacienteService;
  let repository: Repository<PacienteEntity>;
  let pacienteList: PacienteEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [PacienteService],
    }).compile();

    service = module.get<PacienteService>(PacienteService);
    repository = module.get<Repository<PacienteEntity>>(getRepositoryToken(PacienteEntity));
    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear();
    pacienteList = [];
    for(let i = 0; i < 5; i++){
        const paciente: PacienteEntity = await repository.save({
        name: faker.person.firstName(),
        genero: faker.person.sex()})
        pacienteList.push(paciente);
    }
  }

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create should return a new paciente', async () => {
    const paciente: PacienteEntity = {
      id: "",
      name: faker.person.firstName(),
      genero: faker.person.sex(),
      diagnosticos: [],
      medicos: []
    }
 
    const newPaciente: PacienteEntity = await service.create(paciente);
    expect(newPaciente).not.toBeNull();
 
    const storedPaciente: PacienteEntity = await repository.findOne({where: {id: newPaciente.id}})
    expect(storedPaciente).not.toBeNull();
    expect(storedPaciente.name).toEqual(newPaciente.name)
    expect(storedPaciente.genero).toEqual(newPaciente.genero)
  });

  it('create should throw an exception for an invalid name', async () => {
    const paciente: PacienteEntity = {  
      id: "",
      name: "A",
      genero: faker.person.sex(),
      diagnosticos: [],
      medicos: []
    }
    await expect(service.create(paciente)).rejects.toHaveProperty("message", "The patient name must be 3 characters");
  });

}); 

