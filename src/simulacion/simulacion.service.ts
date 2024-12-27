import { Injectable, NotFoundException } from '@nestjs/common';
import { ClientesService } from '../clientes/clientes.service';
import { PerfilesService } from '../perfiles/perfiles.service';
import { OfertasService } from '../ofertas/ofertas.service';

@Injectable()
export class SimulacionService {
  constructor(
    private readonly clientesService: ClientesService,
    private readonly perfilesService: PerfilesService,
    private readonly ofertasService: OfertasService,
  ) {}

  simularCuotas(clienteId: string, monto: number, plazo: number) {
    const cliente = this.clientesService.getCliente(clienteId);
  
    if (!cliente) {
      throw new NotFoundException(`El cliente con ID ${clienteId} no fue encontrado`);
    }
    const perfil = cliente.perfil;
    const capacidadEndeudamiento = cliente.capacidadEndeudamiento;
    // Obtener tasas de interés según el perfil y monto
    const tasa = this.perfilesService.getTasaPorPerfilYMonto(perfil, monto);
  
    if (!tasa) {
      throw new NotFoundException(`No se encontró una tasa para el perfil ${perfil} y monto ${monto}`);
    }
    console.log('Tasa:', tasa);
    

    const cuotaMensual = this.ofertasService.calcularCuota(monto, tasa, plazo);
    const seguro = this.ofertasService.calcularSeguro(cliente.edad, cuotaMensual);

    if( cuotaMensual + seguro > capacidadEndeudamiento ){
      return {
        simulacion: "Valor de la cuota Excede la capacidad de endeudamiento"
      }
    }

    return {
      cliente: {
        id: cliente.id,
        nombre: cliente.nombre,
        perfil: cliente.perfil,
      },
      simulacion: {
        plazo,
        tasa,
        cuotaMensual,
        seguro,
        total: cuotaMensual + seguro,
       
      }
    };
  }
  
}
