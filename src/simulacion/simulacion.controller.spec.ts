import { Test, TestingModule } from '@nestjs/testing';
import { SimulacionController } from './simulacion.controller';

describe('SimulacionController', () => {
  let controller: SimulacionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SimulacionController],
    }).compile();

    controller = module.get<SimulacionController>(SimulacionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
