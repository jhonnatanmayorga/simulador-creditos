import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { PerfilesService } from './perfiles.service';
import { GetTasaDto } from './dto/tasas.dto';

@Controller('perfiles')
export class PerfilesController {
  constructor(private readonly perfilesService: PerfilesService) {}

  @Post('tasa')
  @HttpCode(200)
  getTasaPorPerfilYMonto(
    @Body() params: GetTasaDto
  ) {
    const { perfil, monto } = params;
    return { tasa: this.perfilesService.getTasaPorPerfilYMonto(perfil, monto) };
  }
}
