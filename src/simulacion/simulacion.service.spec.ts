import { Test, TestingModule } from '@nestjs/testing';
import { SimulacionService } from './simulacion.service';
import { ClientesService } from '../clientes/clientes.service';
import { PerfilesService } from '../perfiles/perfiles.service';
import { OfertasService } from '../ofertas/ofertas.service';
import { NotFoundException } from '@nestjs/common';

describe('SimulacionService', () => {
  let service: SimulacionService;
  let mockClientesService: Partial<ClientesService>;
  let mockPerfilesService: Partial<PerfilesService>;
  let mockOfertasService: Partial<OfertasService>;

  beforeEach(async () => {
    mockClientesService = {
      getCliente: jest.fn((id) => {
        if (id === '1') {
          return { id: '1', nombre: 'Cliente 1', edad: 25, perfil: 'AAA' };
        }
        throw new NotFoundException(`El cliente con ID ${id} no fue encontrado`);
      }),
    };

    mockPerfilesService = {
      getTasaPorPerfilYMonto: jest.fn(() => 23.45),
    };

    mockOfertasService = {
      calcularCuota: jest.fn(() => 51510),
      calcularSeguro: jest.fn(() => 1545),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SimulacionService,
        { provide: ClientesService, useValue: mockClientesService },
        { provide: PerfilesService, useValue: mockPerfilesService },
        { provide: OfertasService, useValue: mockOfertasService },
      ],
    }).compile();

    service = module.get<SimulacionService>(SimulacionService);
  });

  it('debería simular correctamente las cuotas', () => {
    const resultado = service.simularCuotas('1', 1000000, 24);

    expect(resultado).toEqual({
      cliente: {
        id: "1",
        nombre: "Cliente 1",
        perfil: "AAA"
    },
    simulacion: {
        plazo: 24,
        tasa: 23.45,
        cuotaMensual: 51510,
        seguro: 1545,
        total: 53055
    }
    });

    expect(mockClientesService.getCliente).toHaveBeenCalledWith('1');
    expect(mockPerfilesService.getTasaPorPerfilYMonto).toHaveBeenCalledWith('AAA', 1000000);
    expect(mockOfertasService.calcularCuota).toHaveBeenCalledWith(1000000, 23.45, 24);
    expect(mockOfertasService.calcularSeguro).toHaveBeenCalledWith(25, 51510);
  });

  it('debería lanzar una excepción si el cliente no existe', () => {
    expect(() => service.simularCuotas('999', 10000000, 24)).toThrow(
      new NotFoundException('El cliente con ID 999 no fue encontrado'),
    );
  });

  it('debería lanzar una excepción si no se encuentra la tasa', () => {
    jest.spyOn(mockPerfilesService, 'getTasaPorPerfilYMonto').mockImplementation(() => {
      throw new NotFoundException(
        'No se encontró una tasa para el perfil AAA con el monto 1000000',
      );
    });

    expect(() => service.simularCuotas('1', 1000000, 24)).toThrow(
      new NotFoundException('No se encontró una tasa para el perfil AAA con el monto 1000000'),
    );
  });
});
