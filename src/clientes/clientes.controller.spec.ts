import { Test, TestingModule } from '@nestjs/testing';
import { ClientesController } from './clientes.controller';
import { ClientesService } from './clientes.service';

describe('ClientesController', () => {
  let controller: ClientesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientesController],
      providers: [ClientesService],
    }).compile();

    controller = module.get<ClientesController>(ClientesController);
  });

  it('debería estar definido', () => {
    expect(controller).toBeDefined();
  });

  it('debería devolver el cliente correcto según el ID', () => {
    const cliente = controller.getCliente('1');
    expect(cliente).toEqual({
      id: '1',
      nombre: 'Cliente 1',
      edad: 25,
      perfil: 'AAA',
      capacidadEndeudamiento: 200000
    });
  });
});
