import { Controller, Get, Query } from '@nestjs/common';
import { PerfilesService } from './perfiles.service';

@Controller('perfiles')
export class PerfilesController {
  constructor(private readonly perfilesService: PerfilesService) {}

  @Get('tasa')
  getTasa(
    @Query('perfil') perfil: string,
    @Query('monto') monto: string,
  ): number {
    const montoNumerico = parseFloat(monto);
    return this.perfilesService.getTasaPorPerfilYMonto(perfil, montoNumerico);
  }
}
