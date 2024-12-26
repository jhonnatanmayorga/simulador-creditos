import { Injectable, NotFoundException } from '@nestjs/common';
import { readFileSync } from 'fs';
import * as path from 'path';

@Injectable()
export class PerfilesService {
  private getPerfiles() {
    const filePath = path.resolve(__dirname, '../../src/perfiles/data/perfiles.db.json');
    const data = readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  }
  private perfiles = this.getPerfiles();

  getTasaPorPerfilYMonto(perfil: string, monto: number): number {
    const perfilEncontrado = this.perfiles.find((p) => p.perfil === perfil);
    console.log('perfil encontrado', perfilEncontrado);
    
    if (!perfilEncontrado) {
      throw new NotFoundException(`El perfil ${perfil} no fue encontrado`);
    }

    const tasaEncontrada = perfilEncontrado.tasas.find((t) => {
      const [rangoMin, rangoMax] = t.rango;
      const dentroDelRango = monto >= rangoMin && (rangoMax === null || monto < rangoMax);
      return dentroDelRango;
    });

    if (!tasaEncontrada) {
      throw new NotFoundException(
        `No se encontró una tasa para el monto ${monto} en el perfil ${perfil}`,
      );
    }

    return tasaEncontrada.tasa;
  }
}
