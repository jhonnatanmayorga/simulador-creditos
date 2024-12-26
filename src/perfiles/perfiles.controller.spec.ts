import { Test, TestingModule } from '@nestjs/testing';
import { PerfilesController } from './perfiles.controller';
import { PerfilesService } from './perfiles.service';
import { ValidationPipe, BadRequestException } from '@nestjs/common';
import { GetTasaDto } from './dto/tasas.dto';

describe('PerfilesController', () => {
  let controller: PerfilesController;
  let perfilesService: PerfilesService;

  beforeEach(async () => {
    const mockPerfilesService = {
      getTasaPorPerfilYMonto: jest.fn((perfil: string, monto: number) => {
        if (perfil === 'AAA' && monto <= 10000000) {
          return 20.1;
        }
        throw new BadRequestException(
          `No se encontró una tasa para el monto ${monto} en el perfil ${perfil}`,
        );
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [PerfilesController],
      providers: [
        { provide: PerfilesService, useValue: mockPerfilesService },
      ],
    }).compile();

    controller = module.get<PerfilesController>(PerfilesController);
    perfilesService = module.get<PerfilesService>(PerfilesService);
  });

  it('debería lanzar una excepción si el perfil no se envía', async () => {
    const dto: GetTasaDto = { perfil: '', monto: 10000000 };
  
    try {
      const validationPipe = new ValidationPipe();
      await validationPipe.transform(dto, {
        type: 'body',
        metatype: GetTasaDto,
      });
    } catch (error) {
      // Aseguramos que TypeScript reconozca el tipo como BadRequestException
      const badRequestError = error as BadRequestException;
      expect(badRequestError).toBeInstanceOf(BadRequestException);
      expect(badRequestError.getResponse()['message']).toContain('El perfil es obligatorio');
    }
  });

  it('debería lanzar una excepción si el monto no se envía', async () => {
    const dto: GetTasaDto = { perfil: 'AAA', monto: null };
  
    try {
      const validationPipe = new ValidationPipe();
      await validationPipe.transform(dto, {
        type: 'body',
        metatype: GetTasaDto,
      });
    } catch (error) {
      // Aseguramos que TypeScript reconozca el tipo como BadRequestException
      const badRequestError = error as BadRequestException;
      expect(badRequestError).toBeInstanceOf(BadRequestException);
      expect(badRequestError.getResponse()['message']).toContain('El monto debe ser un número');
    }
  });

  it('debería devolver la tasa correctamente para un perfil y monto válidos', () => {
    const dto: GetTasaDto = { perfil: 'AAA', monto: 10000000 };
    const resultado = controller.getTasaPorPerfilYMonto(dto);
    expect(resultado).toEqual({ tasa: 20.1 });
  });

  it('debería llamar al servicio con los parámetros correctos', () => {
    const dto: GetTasaDto = { perfil: 'AAA', monto: 10000000 };
    const spy = jest.spyOn(perfilesService, 'getTasaPorPerfilYMonto');
    controller.getTasaPorPerfilYMonto(dto);
    expect(spy).toHaveBeenCalledWith('AAA', 10000000);
  });
});
