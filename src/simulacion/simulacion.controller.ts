import { Controller, Post, Body, NotFoundException } from '@nestjs/common';
import { SimulacionService } from './simulacion.service';
import { SimulacionDto } from './dto/simulacion.dto';

@Controller('simulacion')
export class SimulacionController {
  constructor(private readonly simulacionService: SimulacionService) {}

  @Post('cuotas')
  simularCuotas(
/*     @Body('clienteId') clienteId: string,
    @Body('monto') monto: number,
    @Body('plazo') plazo: number, */
    @Body() params: SimulacionDto
  ) {
    /* if (!clienteId || !monto || !plazo) {
      throw new NotFoundException(
        'El clienteId, monto y plazo son obligatorios para realizar la simulación',
      );
    } */
    const { clienteId, monto, plazo } = params
    return this.simulacionService.simularCuotas(clienteId, monto, plazo);
  }
}
