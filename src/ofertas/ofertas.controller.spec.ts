import { Test, TestingModule } from '@nestjs/testing';
import { OfertasController } from './ofertas.controller';
import { OfertasService } from './ofertas.service';
import { ClientesService } from '../clientes/clientes.service';
import { NotFoundException } from '@nestjs/common';

describe('OfertasController', () => {
  let controller: OfertasController;
  let mockOfertasService: Partial<OfertasService>;
  let mockClientesService: Partial<ClientesService>;

  beforeEach(async () => {
    mockClientesService = {
      getCliente: jest.fn((id: string) => {
        if (id === '1') {
          return { id: '1', nombre: 'Cliente 1', perfil: 'AAA', capacidadEndeudamiento: 200000 };
        }
        if (id === '999') {
          return { id: '999', nombre: 'Cliente 999', perfil: 'BAA', capacidadEndeudamiento: 2000000 };
        }
        throw new NotFoundException(`No se encontró el cliente con ID ${id}`);
      }),
    };

    mockOfertasService = {
      obtenerOfertasPorCliente: jest.fn((clienteId: string) => {
        if (clienteId === '1') {
          return [
            {
              id: '1',
              clienteId: '1',
              monto: 7847500,
              tasa: 20.1,
              plazo: 24,
              estado: 'activo',
            },
            {
              id: '2',
              clienteId: '1',
              monto: 11442000,
              tasa: 20.1,
              plazo: 36,
              estado: 'activo',
            },
          ];
        }
        throw new NotFoundException(`No se encontraron ofertas para el cliente con ID ${clienteId}`);
      }),

      calcularCuota: jest.fn((monto: number, tasa: number, plazo: number) => {
        const tasaMensual = Math.pow(1 + tasa / 100, 1 / 12) - 1;
        const numerador = monto * tasaMensual;
        const denominador = 1 - Math.pow(1 + tasaMensual, -plazo);
        return Math.round(numerador / denominador);
      }),
      generarOferta: jest.fn((clienteId, monto, plazo, tasa) => ({
        id: '2',
        clienteId,
        monto,
        plazo,
        tasa,
        estado: 'activo',
      })),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [OfertasController],
      providers: [
        { provide: OfertasService, useValue: mockOfertasService },
        { provide: ClientesService, useValue: mockClientesService },
      ],
    }).compile();

    controller = module.get<OfertasController>(OfertasController);
  });

  it('debería estar definido', () => {
    expect(controller).toBeDefined();
  });

  describe('obtenerOfertas', () => {
    it('debería devolver ofertas con información del cliente y capacidad de endeudamiento', () => {
      const resultado = controller.obtenerOfertas('1');
      expect(mockClientesService.getCliente).toHaveBeenCalledWith('1');
      expect(resultado).toEqual({
          cliente: {
            id: "1",
            nombre: "Cliente 1",
            perfil: "AAA",
            capacidadEndeudamiento: 200000,
          },
          ofertas: [
            {
              id: "1",
              clienteId: "1",
              monto: 7847500,
              tasa: 20.1,
              plazo: 24,
              estado: "activo",
              excedeCapacidad: true
          },
          {
              id: "2",
              clienteId: "1",
              monto: 11442000,
              tasa: 20.1,
              plazo: 36,
              estado: "activo",
              excedeCapacidad: true
          }
          ]
        });
    });

    it('debería lanzar una excepción si clienteId no está definido', () => {
      expect(() => controller.obtenerOfertas('')).toThrow(
        new NotFoundException('El clienteId es obligatorio'),
      );
    });

    it('debería lanzar una excepción si no se encuentran ofertas para un cliente', () => {
      expect(() => controller.obtenerOfertas('999')).toThrow(
        new NotFoundException('No se encontraron ofertas para el cliente con ID 999'),
      );
      expect(mockClientesService.getCliente).toHaveBeenCalledWith('999');
    });
  });

  describe('generarOferta', () => {
    it('debería generar una oferta correctamente', () => {
      const body = {
        clienteId: '1',
        monto: 10000000,
        plazo: 24,
        tasa: 18.5,
      };

      const nuevaOferta = controller.generarOferta(body);

      expect(nuevaOferta).toEqual({
        id: '2',
        clienteId: '1',
        monto: 10000000,
        plazo: 24,
        tasa: 18.5,
        estado: 'activo',
      });

      expect(mockOfertasService.generarOferta).toHaveBeenCalledWith('1', 10000000, 24, 18.5);
    });
  });
});
