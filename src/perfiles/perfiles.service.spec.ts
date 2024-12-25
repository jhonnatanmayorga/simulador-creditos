import { Test, TestingModule } from '@nestjs/testing';
import { PerfilesService } from './perfiles.service';

describe('PerfilesService', () => {
  let service: PerfilesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PerfilesService],
    }).compile();

    service = module.get<PerfilesService>(PerfilesService);
  });

  it('debería estar definido', () => {
    expect(service).toBeDefined();
  });

  it('debería devolver la tasa correcta para AAA y monto de $8,000,000', () => {
    const perfil = 'AAA';
    const monto = 8000000;
    const tasa = service.getTasaPorPerfilYMonto(perfil, monto);
    expect(tasa).toBe(20.10); // Según la tabla proporcionada
  });

  it('debería devolver la tasa correcta para AA y monto de $50,000,000', () => {
    const perfil = 'AA';
    const monto = 50000000;
    const tasa = service.getTasaPorPerfilYMonto(perfil, monto);
    expect(tasa).toBe(18.50); // Según la tabla proporcionada
  });

  it('debería lanzar un error para un perfil inexistente', () => {
    const perfil = 'INVALIDO';
    const monto = 8000000;
    expect(() => service.getTasaPorPerfilYMonto(perfil, monto)).toThrowError(
      `Perfil ${perfil} no encontrado`,
    );
  });

  it('debería lanzar un error para un monto fuera de los rangos', () => {
    const perfil = 'AAA';
    const monto = -1000;
    expect(() => service.getTasaPorPerfilYMonto(perfil, monto)).toThrowError(
      `No se encontró una tasa para el monto ${monto}`,
    );
  });
});
