import { Injectable, NotFoundException } from '@nestjs/common';
import { readFileSync } from 'fs';
import * as path from 'path';

@Injectable()
export class OfertasService {


  private getClientes() {
    const filePath = path.resolve(__dirname, '../../src/clientes/data/clientes.db.json');
    const data = readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  }
  private getOfertas() {
    const filePath = path.resolve(__dirname, '../../src/ofertas/data/ofertas.db.json');
    const data = readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  }
  private clientes = this.getClientes();
  private ofertasDb = this.getOfertas();

  obtenerOfertasPorCliente(clienteId: string) {


    const ofertas = this.ofertasDb.filter((oferta) => oferta.clienteId === clienteId);

    if (ofertas.length === 0) {
      throw new NotFoundException(
        `No se encontraron ofertas para el cliente con ID ${clienteId}`,
      );
    }

    return ofertas.map((oferta) => {
      const cliente = this.clientes.find((c) => c.id === clienteId);
      if (!cliente) {
        throw new NotFoundException(`No se encontró el cliente con ID ${clienteId}`);
      }

      // Validar si la cuota excede la capacidad de endeudamiento
      const cuotaMensual = this.calcularCuota(oferta.monto, oferta.tasa, oferta.plazo);
      return {
        ...oferta,
        excedeCapacidad: cuotaMensual > cliente.capacidadEndeudamiento,
      };
    });
  }

  generarOferta(clienteId: string, monto: number, plazo: number, tasa: number) {
    const nuevaOferta = {
      id: String(this.ofertasDb.length + 1),
      clienteId,
      monto,
      plazo,
      tasa,
      estado: 'activo', // Estado predeterminado
    };

    this.ofertasDb.push(nuevaOferta);
    return nuevaOferta;
  }

  // Método para calcular la cuota mensual
  calcularCuota(monto: number, tasa: number, plazo: number): number {
    const tasaMensual = Math.pow(1 + tasa / 100, 1 / 12) - 1;

    const numerador = monto * tasaMensual;
    const denominador = 1 - Math.pow(1 + tasaMensual, -plazo);

    const cuota = numerador / denominador;
    return Math.round(cuota); // Redondear al entero más cercano
  }

  // Método para calcular el seguro
  calcularSeguro(edad: number, cuotaMensual: number): number {
    let porcentajeSeguro = 0;

    if (edad >= 19 && edad <= 30) {
      porcentajeSeguro = 0.03;
    } else if (edad >= 31 && edad <= 60) {
      porcentajeSeguro = 0.04;
    } else if (edad >= 61 && edad <= 70) {
      porcentajeSeguro = 0.05;
    } else {
      throw new NotFoundException(`No se calcula seguro para la edad ${edad}`);
    }

    return Math.round(cuotaMensual * porcentajeSeguro);
  }
}
