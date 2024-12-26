import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PerfilesModule } from './perfiles/perfiles.module';
import { ClientesModule } from './clientes/clientes.module';
import { OfertasModule } from './ofertas/ofertas.module';
import { SimulacionModule } from './simulacion/simulacion.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

@Module({
  imports: [PerfilesModule, ClientesModule, OfertasModule, SimulacionModule],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  
  
  ],
})
export class AppModule {}
