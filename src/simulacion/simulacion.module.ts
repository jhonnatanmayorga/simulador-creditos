import { Module } from '@nestjs/common';
import { SimulacionController } from './simulacion.controller';
import { SimulacionService } from './simulacion.service';

@Module({
  controllers: [SimulacionController],
  providers: [SimulacionService]
})
export class SimulacionModule {}
