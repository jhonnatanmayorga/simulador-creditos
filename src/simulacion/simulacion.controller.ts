import { Controller, Post, Body, NotFoundException } from '@nestjs/common';
import { SimulacionService } from './simulacion.service';
import { SimulacionDto } from './dto/simulacion.dto';

@Controller('simulacion')
export class SimulacionController {
  constructor(private readonly simulacionService: SimulacionService) {}

  @Post('cuotas')
  simularCuotas(
    @Body() params: SimulacionDto
  ) {
    const { clienteId, monto, plazo } = params
    return this.simulacionService.simularCuotas(clienteId, monto, plazo);
  }
}
