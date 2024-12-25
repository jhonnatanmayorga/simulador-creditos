import { Module } from '@nestjs/common';
import { OfertasController } from './ofertas.controller';
import { OfertasService } from './ofertas.service';
import { ClientesService } from '../clientes/clientes.service';
import { PerfilesService } from '../perfiles/perfiles.service';

@Module({
  controllers: [OfertasController],
  providers: [
    OfertasService,
    ClientesService,
    PerfilesService
  ]
})
export class OfertasModule {}
