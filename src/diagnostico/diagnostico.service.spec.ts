/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { DiagnosticoService } from './diagnostico.service';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';
import { DiagnosticoEntity } from './diagnostico.entity';

describe('DiagnosticoService', () => {
  let service: DiagnosticoService;
  let repository: Repository<DiagnosticoEntity>;
  let diagnosticoList: DiagnosticoEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [DiagnosticoService],
    }).compile();

    service = module.get<DiagnosticoService>(DiagnosticoService);
    repository = module.get<Repository<DiagnosticoEntity>>(getRepositoryToken(DiagnosticoEntity));
    await seedDatabase();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  const seedDatabase = async () => {
    repository.clear();
    diagnosticoList = [];
    for(let i = 0; i < 5; i++){
        const diagnostico: DiagnosticoEntity = await repository.save({
        name: faker.person.firstName(), 
        description: faker.lorem.sentence()})
        diagnosticoList.push(diagnostico);
    }
  }

  it('findAll should return all diagnosticos', async () => {
    const diagnosticos: DiagnosticoEntity[] = await service.findAll();
    expect(diagnosticos).not.toBeNull();
    expect(diagnosticos).toHaveLength(diagnosticoList.length);
  });

  it('findOne should return a diagnostico by id', async () => {
    const storedDiagnostico: DiagnosticoEntity = diagnosticoList[0];
    const diagnostico: DiagnosticoEntity = await service.findOne(storedDiagnostico.id);
    expect(diagnostico).not.toBeNull();
    expect(diagnostico.name).toEqual(storedDiagnostico.name)
    expect(diagnostico.description).toEqual(storedDiagnostico.description)
  });

  it('findOne should throw an exception for an invalid diagnostico', async () => {
    await expect(() => service.findOne("0")).rejects.toHaveProperty("message", "The diagnostico with the given id was not found")
  });

  it('create should return a new diagnostico', async () => {
    const diagnostico: DiagnosticoEntity = {
      id: "",
      name: faker.person.firstName(), 
      description: faker.lorem.sentence(), 
      pacientes: []
    }

    const newDiagnostico: DiagnosticoEntity = await service.create(diagnostico);
    expect(newDiagnostico).not.toBeNull();

    const storedDiagnostico: DiagnosticoEntity = await repository.findOne({where: {id: newDiagnostico.id}})
    expect(storedDiagnostico).not.toBeNull();
    expect(storedDiagnostico.name).toEqual(newDiagnostico.name)
    expect(storedDiagnostico.description).toEqual(newDiagnostico.description)
  });

  it('create should throw an exception for an invalid description', async () => {
    const diagnostico: DiagnosticoEntity = {  
      id: "",
      name: "",
      description: faker.lorem.paragraphs(), 
      pacientes: []
    }
    await expect(service.create(diagnostico)).rejects.toHaveProperty("message", "The description must not exceed 200 characters");
  });

  it('delete should remove a diagnostico', async () => {
    const diagnostico: DiagnosticoEntity = diagnosticoList[0];
    await service.delete(diagnostico.id);
    const deletedDiagnostico: DiagnosticoEntity = await repository.findOne({ where: { id: diagnostico.id } })
    expect(deletedDiagnostico).toBeNull();
  });

  it('delete should throw an exception for an invalid diagnostico', async () => {
    await expect(() => service.delete("0")).rejects.toHaveProperty("message", "The diagnostico with the given id was not found")
  });

});
