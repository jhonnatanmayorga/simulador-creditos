import { Test, TestingModule } from '@nestjs/testing';
import { ClientesService } from './clientes.service';

describe('ClientesService', () => {
  let service: ClientesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClientesService],
    }).compile();

    service = module.get<ClientesService>(ClientesService);
  });

  it('debería estar definido', () => {
    expect(service).toBeDefined();
  });

  it('debería devolver el cliente correcto según el ID', () => {
    const cliente = service.getCliente('1');
    expect(cliente).toEqual({
      id: '1',
      nombre: 'Cliente 1',
      edad: 25,
      perfil: 'AAA',
      monto: 10000000,
    });
  });

  it('debería lanzar un error si el cliente no existe', () => {
    expect(() => service.getCliente('999')).toThrowError(
      'Cliente con ID 999 no encontrado',
    );
  });
});
