import { NotFoundException } from "@nestjs/common";
import { OfertasService } from "./ofertas.service";
import { Test, TestingModule } from "@nestjs/testing";

describe('OfertasService', () => {
  let service: OfertasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OfertasService],
    }).compile();

    service = module.get<OfertasService>(OfertasService);
  });

  it('debería devolver ofertas con validación de capacidad de endeudamiento', () => {
    const clienteId = '3';
    const resultado = service.obtenerOfertasPorCliente(clienteId);

    expect(resultado).toEqual([
      {
        id: '5',
        clienteId: '3',
        monto: 11442000,
        plazo: 12,
        tasa: 20.1,
        estado: 'activo',
        excedeCapacidad: false, // Validar que no excede
      },
    ]);
  });

  it('debería lanzar una excepción si no se encuentran ofertas para el cliente', () => {
    expect(() => service.obtenerOfertasPorCliente('999')).toThrow(
      new NotFoundException('No se encontraron ofertas para el cliente con ID 999'),
    );
  });

  it('debería calcular correctamente la cuota mensual', () => {
    const cuota = service.calcularCuota(5000000, 20.1, 12);
    expect(cuota).toBeGreaterThan(0);
  });

  it('debería calcular correctamente el seguro basado en la edad', () => {
    const seguro = service.calcularSeguro(25, 926277);
    expect(seguro).toBe(27788); // Validar un cálculo específico
  });
});
