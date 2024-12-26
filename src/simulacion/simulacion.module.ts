import { Module } from '@nestjs/common';
import { SimulacionController } from './simulacion.controller';
import { SimulacionService } from './simulacion.service';
import { ClientesService } from '../clientes/clientes.service';
import { PerfilesService } from '../perfiles/perfiles.service';
import { OfertasService } from '../ofertas/ofertas.service';

@Module({
  controllers: [SimulacionController],
  providers: [SimulacionService, ClientesService, PerfilesService, OfertasService],
})
export class SimulacionModule {}
