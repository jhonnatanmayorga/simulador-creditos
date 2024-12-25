import { Test, TestingModule } from '@nestjs/testing';
import { PerfilesController } from './perfiles.controller';
import { PerfilesService } from './perfiles.service';

describe('PerfilesController', () => {
  let controller: PerfilesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PerfilesController],
      providers: [PerfilesService], // Aseguramos que el servicio esté disponible
    }).compile();

    controller = module.get<PerfilesController>(PerfilesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('debería devolver la tasa correcta para AAA y monto de $8,000,000', () => {
    const tasa = controller.getTasa('AAA', '8000000');
    expect(tasa).toBe(20.10); // Según la tabla proporcionada
  });
});
