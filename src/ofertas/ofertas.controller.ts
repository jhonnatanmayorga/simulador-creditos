import { Controller, Get, Param } from '@nestjs/common';
import { OfertasService } from './ofertas.service';

@Controller('ofertas')
export class OfertasController {
  constructor(private readonly ofertasService: OfertasService) {}

  @Get(':clienteId')
  generarOferta(@Param('clienteId') clienteId: string) {
    return this.ofertasService.generarOferta(clienteId);
  }
}
