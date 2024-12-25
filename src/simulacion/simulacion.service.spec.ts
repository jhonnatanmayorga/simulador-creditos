import { Test, TestingModule } from '@nestjs/testing';
import { SimulacionService } from './simulacion.service';

describe('SimulacionService', () => {
  let service: SimulacionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SimulacionService],
    }).compile();

    service = module.get<SimulacionService>(SimulacionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
