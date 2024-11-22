import { Test, TestingModule } from '@nestjs/testing';
import { MedicoService } from './medico.service';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';

describe('MedicoService', () => {
  let service: MedicoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [MedicoService],
    }).compile();

    service = module.get<MedicoService>(MedicoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
