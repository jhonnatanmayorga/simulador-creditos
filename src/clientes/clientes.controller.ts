import { Controller, Get, Param } from '@nestjs/common';
import { ClientesService } from './clientes.service';

@Controller('clientes')
export class ClientesController {
  constructor(private readonly clientesService: ClientesService) {}

  @Get(':clienteId')
  getCliente(@Param('clienteId') clienteId: string) {
    console.log('clienteId', clienteId);
    
    return this.clientesService.getCliente(clienteId);
  }
}
