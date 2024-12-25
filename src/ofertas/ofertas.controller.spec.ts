import { Test, TestingModule } from '@nestjs/testing';
import { OfertasController } from './ofertas.controller';
import { OfertasService } from './ofertas.service';

describe('OfertasController', () => {
  let controller: OfertasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OfertasController],
      providers: [
        {
          provide: OfertasService,
          useValue: {
            generarOferta: jest.fn().mockReturnValue({
              cliente: 'Cliente 1',
              perfil: 'AAA',
              monto: 10000000,
              tasa: 20.10,
              cuotas: [
                { plazo: 12, cuotaMensual: 926277.48 },
                { plazo: 24, cuotaMensual: 512501.42 },
              ],
            }),
          },
        },
      ],
    }).compile();

    controller = module.get<OfertasController>(OfertasController);
  });

  it('debería estar definido', () => {
    expect(controller).toBeDefined();
  });

  it('debería devolver una oferta correcta', () => {
    const oferta = controller.generarOferta('1');
    expect(oferta).toEqual({
      cliente: 'Cliente 1',
      perfil: 'AAA',
      monto: 10000000,
      tasa: 20.10,
      cuotas: [
        { plazo: 12, cuotaMensual: 926277.48 },
        { plazo: 24, cuotaMensual: 512501.42 },
      ],
    });
  });
});
