import { Test, TestingModule } from '@nestjs/testing';
import { PerfilesService } from './perfiles.service';
import { NotFoundException } from '@nestjs/common';

describe('PerfilesService', () => {
  let service: PerfilesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PerfilesService],
    }).compile();

    service = module.get<PerfilesService>(PerfilesService);
  });

  it('debería devolver la tasa correcta para un perfil y monto', () => {
    const tasa = service.getTasaPorPerfilYMonto('AAA', 8000000);
    expect(tasa).toBe(20.1);
  });

  it('debería lanzar una excepción si no se encuentra el perfil', () => {
    expect(() => service.getTasaPorPerfilYMonto('ZZZ', 8000000)).toThrow(
      new NotFoundException('El perfil ZZZ no fue encontrado'),
    );
  });

  it('debería lanzar una excepción si no se encuentra una tasa para el monto', () => {
    expect(() => service.getTasaPorPerfilYMonto('AAA', -5000)).toThrow(
      new NotFoundException('No se encontró una tasa para el monto -5000 en el perfil AAA'),
    );
  });

  it('debería devolver la tasa más baja para montos superiores a los rangos definidos', () => {
    const tasa = service.getTasaPorPerfilYMonto('AAA', 90000000);
    expect(tasa).toBe(13.1);
  });
});
