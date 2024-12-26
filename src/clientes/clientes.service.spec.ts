import { Test, TestingModule } from '@nestjs/testing';
import { ClientesService } from './clientes.service';
import { NotFoundException } from '@nestjs/common';

describe('ClientesService', () => {
  let service: ClientesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClientesService],
    }).compile();

    service = module.get<ClientesService>(ClientesService);
  });

  it('debería devolver el cliente correcto según el ID', () => {
    const cliente = service.getCliente('1');
    expect(cliente).toEqual({
      id: '1',
      nombre: 'Cliente 1',
      edad: 25,
      perfil: 'AAA',
      capacidadEndeudamiento: 200000
    });
  });

  it('debería lanzar una excepción si el cliente no existe', () => {
    expect(() => service.getCliente('998')).toThrow(
      new NotFoundException('El cliente con ID 998 no fue encontrado'),
    );
  });
});
