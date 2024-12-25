import { Injectable } from '@nestjs/common';

@Injectable()
export class PerfilesService {

    private readonly tasas = {
        AAA: [
          { rango: [0, 7000000], tasa: 23.45 },
          { rango: [7000000, 15000000], tasa: 20.10 },
          { rango: [15000000, 50000000], tasa: 17.60 },
          { rango: [50000000, 80000000], tasa: 15.10 },
          { rango: [80000000, Infinity], tasa: 13.10 },
        ],
        AA: [
          { rango: [0, 7000000], tasa: 24.95 },
          { rango: [7000000, 15000000], tasa: 24.00 },
          { rango: [15000000, 50000000], tasa: 21.30 },
          { rango: [50000000, 80000000], tasa: 18.50 },
          { rango: [80000000, Infinity], tasa: 16.50 },
        ],
        A: [
          { rango: [0, 7000000], tasa: 25.50 },
          { rango: [7000000, 15000000], tasa: 25.30 },
          { rango: [15000000, 50000000], tasa: 23.80 },
          { rango: [50000000, 80000000], tasa: 21.30 },
          { rango: [80000000, Infinity], tasa: 19.30 },
        ],
        BAA: [
          { rango: [0, 7000000], tasa: 26.10 },
          { rango: [7000000, 15000000], tasa: 26.10 },
          { rango: [15000000, 50000000], tasa: 26.10 },
          { rango: [50000000, 80000000], tasa: 26.10 },
          { rango: [80000000, Infinity], tasa: 26.10 },
        ],
    };

    getTasaPorPerfilYMonto(perfil: string, monto: number): number {
      const tasasPerfil = this.tasas[perfil];
      if (!tasasPerfil) {
        throw new Error(`Perfil ${perfil} no encontrado`);
      }

      const tasa = tasasPerfil.find(
        (t) => monto >= t.rango[0] && monto < t.rango[1],
      );
      if (!tasa) {
        throw new Error(`No se encontró una tasa para el monto ${monto}`);
      }

      return tasa.tasa;
    }
}
