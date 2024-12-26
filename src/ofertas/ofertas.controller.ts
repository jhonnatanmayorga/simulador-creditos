import { Controller, Get, Post, Body, Query, NotFoundException } from '@nestjs/common';
import { OfertasService } from './ofertas.service';
import { ClientesService } from '../clientes/clientes.service';

@Controller('ofertas')
export class OfertasController {
  constructor(
    private readonly ofertasService: OfertasService,
    private readonly clientesService: ClientesService,
  ) {}

  @Get()
  obtenerOfertas(@Query('clienteId') clienteId: string) {
    if (!clienteId) {
      throw new NotFoundException('El clienteId es obligatorio');
    }

    const cliente = this.clientesService.getCliente(clienteId);
    console.log('cliente', cliente);
    
    if (!cliente) {
      console.log('no hay cliente',cliente);
      
      throw new NotFoundException(`No se encontró el cliente con ID ${clienteId}`);
    }

    const ofertas = this.ofertasService.obtenerOfertasPorCliente(clienteId);

    return {
      
        cliente: {
          id: cliente.id,
          nombre: cliente.nombre,
          perfil: cliente.perfil,
          capacidadEndeudamiento: cliente.capacidadEndeudamiento,
        },
        ofertas: ofertas.map((oferta) => ({
          ...oferta,
          excedeCapacidad:
            this.ofertasService.calcularCuota(oferta.monto, oferta.tasa, oferta.plazo) >
            cliente.capacidadEndeudamiento,
        })),
      
    };
  }

  @Post()
  generarOferta(
    @Body() body: { clienteId: string; monto: number; plazo: number; tasa: number },
  ) {
    const { clienteId, monto, plazo, tasa } = body;
    return this.ofertasService.generarOferta(clienteId, monto, plazo, tasa);
  }
}
