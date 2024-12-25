import { Controller, Get, Param } from '@nestjs/common';
import { ClientesService } from './clientes.service';

@Controller('clientes')
export class ClientesController {
  constructor(private readonly clientesService: ClientesService) {}

  // Endpoint para obtener un cliente por ID
  @Get(':id')
  getCliente(@Param('id') id: string) {
    return this.clientesService.getCliente(id);
  }
}
