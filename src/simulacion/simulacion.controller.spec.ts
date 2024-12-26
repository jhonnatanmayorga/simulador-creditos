import { Test, TestingModule } from '@nestjs/testing';
import { SimulacionController } from './simulacion.controller';
import { SimulacionService } from './simulacion.service';
import { BadRequestException, NotFoundException, ValidationPipe } from '@nestjs/common';
import { SimulacionDto } from './dto/simulacion.dto';

describe('SimulacionController', () => {
  let controller: SimulacionController;
  let mockSimulacionService: Partial<SimulacionService>;

  beforeEach(async () => {
    mockSimulacionService = {
      simularCuotas: jest.fn((clienteId, monto, plazo) => ({
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
      })),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [SimulacionController],
      providers: [{ provide: SimulacionService, useValue: mockSimulacionService }],
    }).compile();

    controller = module.get<SimulacionController>(SimulacionController);
  });

  it('debería simular correctamente las cuotas', () => {
    const resultado = controller.simularCuotas({clienteId:'1', monto: 1000000, plazo: 24});

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

    expect(mockSimulacionService.simularCuotas).toHaveBeenCalledWith('1', 1000000, 24);
  });


  it('debería lanzar una excepción si faltan parámetros requeridos', async () => {
    const dto: SimulacionDto = {clienteId:'', monto: 1000000, plazo: 24};
  
    try {
      const validationPipe = new ValidationPipe();
      await validationPipe.transform(dto, {
        type: 'body',
        metatype: SimulacionDto,
      });
    } catch (error) {
      // Aseguramos que TypeScript reconozca el tipo como BadRequestException
      const badRequestError = error as BadRequestException;
      expect(badRequestError).toBeInstanceOf(BadRequestException);
      expect(badRequestError.getResponse()['message']).toContain('El clienteId es obligatorio');
    }
  });


});
