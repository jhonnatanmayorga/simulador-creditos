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

  it('debería estar definido', () => {
    expect(service).toBeDefined();
  });

  it('debería calcular correctamente la cuota mensual', () => {
    const cuota = service.calcularCuota(10000000, 20.10, 24);
    expect(cuota).toBeCloseTo(501447, 2); // Valor exacto del portal
  });
  
  it('debería calcular correctamente el seguro', () => {
    const seguro = service.calcularSeguro(25, 501447);
    expect(seguro).toBeCloseTo(15043, 2); // Valor exacto del portal
  });
  
  it('debería simular correctamente el total mensual', () => {
    const resultado = service.simularCuotas(10000000, 20.10, 24, 25);
    expect(resultado).toEqual({
      monto: 10000000,
      plazo: 24,
      tasa: 20.10,
      cuotaMensual: 501447,
      seguro: 15043,
      totalMensual: 516490, // Suma de cuota + seguro
    });
  });
});
