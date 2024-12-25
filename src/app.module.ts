import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PerfilesModule } from './perfiles/perfiles.module';
import { ClientesModule } from './clientes/clientes.module';
import { OfertasModule } from './ofertas/ofertas.module';
import { SimulacionModule } from './simulacion/simulacion.module';

@Module({
  imports: [PerfilesModule, ClientesModule, OfertasModule, SimulacionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
