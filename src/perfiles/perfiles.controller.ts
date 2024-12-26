import { Body, Controller, Post } from '@nestjs/common';
import { PerfilesService } from './perfiles.service';
import { GetTasaDto } from './dto/tasas.dto';

@Controller('perfiles')
export class PerfilesController {
  constructor(private readonly perfilesService: PerfilesService) {}

  @Post('tasa')
  getTasaPorPerfilYMonto(
    @Body() params: GetTasaDto
  ) {
    const { perfil, monto } = params;
    return { tasa: this.perfilesService.getTasaPorPerfilYMonto(perfil, monto) };
  }
}
