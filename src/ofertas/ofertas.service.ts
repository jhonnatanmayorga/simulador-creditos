import { Injectable } from '@nestjs/common';
import { ClientesService } from '../clientes/clientes.service';
import { PerfilesService } from '../perfiles/perfiles.service';

@Injectable()
export class OfertasService {
  constructor(
    private readonly clientesService: ClientesService,
    private readonly perfilesService: PerfilesService,
  ) {}

  generarOferta(clienteId: string) {
    // Obtener datos del cliente
    const cliente = this.clientesService.getCliente(clienteId);

    // Obtener la tasa según el perfil y monto
    const tasa = this.perfilesService.getTasaPorPerfilYMonto(
      cliente.perfil,
      cliente.monto,
    );

    // Generar las cuotas para diferentes plazos
    const plazos = [12, 24, 36, 48, 60]; // Plazos permitidos
    const cuotas = plazos.map((plazo) => {
      const cuotaMensual = this.calcularCuota(cliente.monto, tasa, plazo);
      return { plazo, cuotaMensual };
    });

    // Devolver la oferta
    return {
      cliente: cliente.nombre,
      perfil: cliente.perfil,
      monto: cliente.monto,
      tasa,
      cuotas,
    };
  }

  private calcularCuota(monto: number, tasa: number, plazo: number): number {
    const tasaMensual = tasa / 100 / 12; // Convertir E.A. a tasa mensual
    const cuota =
      (monto * tasaMensual) / (1 - Math.pow(1 + tasaMensual, -plazo));
    return Math.round(cuota * 100) / 100; // Redondear a 2 decimales
  }
}
