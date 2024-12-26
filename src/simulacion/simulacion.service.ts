import { Injectable } from '@nestjs/common';

@Injectable()
export class SimulacionService {

    calcularCuota(monto: number, tasa: number, plazo: number): number {
        const tasaMensual = Math.pow(1 + tasa / 100, 1 / 12) - 1;
        const numerador = monto * tasaMensual;
        const denominador = 1 - Math.pow(1 + tasaMensual, -plazo);
      
        const cuota = numerador / denominador;
      
        // Redondear
        return Math.round(cuota ) ;
    }

    calcularSeguro(edad: number, cuotaMensual: number): number {
        let porcentajeSeguro = 0;
      
        if (edad >= 19 && edad <= 30) {
          porcentajeSeguro = 0.03;
        } else if (edad >= 31 && edad <= 60) {
          porcentajeSeguro = 0.04;
        } else if (edad >= 61 && edad <= 70) {
          porcentajeSeguro = 0.05;
        }
      
        const seguro = cuotaMensual * porcentajeSeguro;
        
      
        // Redondear
        return Math.round(seguro);
      }
      
      

    simularCuotas(monto: number, tasa: number, plazo: number, edad: number) {
      const cuotaMensual = this.calcularCuota(monto, tasa, plazo);
      const seguro = this.calcularSeguro(edad, cuotaMensual);

      return {
        monto,
        plazo,
        tasa,
        cuotaMensual,
        seguro,
        totalMensual: cuotaMensual + seguro,
      };
    }

}
