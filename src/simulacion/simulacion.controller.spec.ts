import { Test, TestingModule } from '@nestjs/testing';
import { SimulacionController } from './simulacion.controller';
import { SimulacionService } from './simulacion.service';

describe('SimulacionController', () => {
  let controller: SimulacionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SimulacionController],
      providers: [
        {
          provide: SimulacionService,
          useValue: {
            simularCuotas: jest.fn().mockReturnValue({
              monto: 10000000,
              plazo: 24,
              tasa: 20.10,
              cuotaMensual: 512501.42,
              seguro: 15375.04,
              totalMensual: 527876.46,
            }),
          },
        },
      ],
    }).compile();

    controller = module.get<SimulacionController>(SimulacionController);
  });

  it('debería estar definido', () => {
    expect(controller).toBeDefined();
  });

  it('debería devolver una simulación correcta', () => {
    const body = { monto: 10000000, tasa: 20.10, plazo: 24, edad: 25 };
    const simulacion = controller.simular(body);
    expect(simulacion).toEqual({
      monto: 10000000,
      plazo: 24,
      tasa: 20.10,
      cuotaMensual: 512501.42,
      seguro: 15375.04,
      totalMensual: 527876.46,
    });
  });
});
