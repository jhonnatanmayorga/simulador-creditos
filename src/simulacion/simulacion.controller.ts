import { Controller, Post, Body } from '@nestjs/common';
import { SimulacionService } from './simulacion.service';

@Controller('simulacion')
export class SimulacionController {
  constructor(private readonly simulacionService: SimulacionService) {}

  @Post()
  simular(@Body() body: { monto: number; tasa: number; plazo: number; edad: number }) {
    const { monto, tasa, plazo, edad } = body;
    return this.simulacionService.simularCuotas(monto, tasa, plazo, edad);
  }
}
