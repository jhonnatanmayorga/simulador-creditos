import { Test, TestingModule } from '@nestjs/testing';
import { OfertasService } from './ofertas.service';
import { ClientesService } from '../clientes/clientes.service';
import { PerfilesService } from '../perfiles/perfiles.service';

describe('OfertasService', () => {
  let service: OfertasService;
  let clientesService: ClientesService;
  let perfilesService: PerfilesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OfertasService,
        {
          provide: ClientesService,
          useValue: {
            getCliente: jest.fn().mockReturnValue({
              id: '1',
              nombre: 'Cliente 1',
              perfil: 'AAA',
              monto: 10000000,
            }),
          },
        },
        {
          provide: PerfilesService,
          useValue: {
            getTasaPorPerfilYMonto: jest.fn().mockReturnValue(20.10),
          },
        },
      ],
    }).compile();

    service = module.get<OfertasService>(OfertasService);
    clientesService = module.get<ClientesService>(ClientesService);
    perfilesService = module.get<PerfilesService>(PerfilesService);
  });

  it('debería estar definido', () => {
    expect(service).toBeDefined();
  });

  it('debería generar una oferta correcta', () => {
    const oferta = service.generarOferta('1');
    expect(oferta).toEqual({
      cliente: 'Cliente 1',
      perfil: 'AAA',
      monto: 10000000,
      tasa: 20.10,
      cuotas: expect.arrayContaining([
        { plazo: 12, cuotaMensual: expect.any(Number) },
        { plazo: 24, cuotaMensual: expect.any(Number) },
        { plazo: 36, cuotaMensual: expect.any(Number) },
        { plazo: 48, cuotaMensual: expect.any(Number) },
        { plazo: 60, cuotaMensual: expect.any(Number) },
      ]),
    });
  });
});
