import { Injectable, NotFoundException } from '@nestjs/common';
import { readFileSync } from 'fs';
import * as path from 'path';

@Injectable()
export class ClientesService {
  private getClientes() {
    const filePath = path.resolve(__dirname, '../../src/clientes/data/clientes.db.json');
    const data = readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  }

  getCliente(clienteId: string) {
    const clientes = this.getClientes();

    const cliente = clientes.find((cliente) => cliente.id === clienteId);
    
    if (!cliente) {
      throw new NotFoundException(`El cliente con ID ${clienteId} no fue encontrado`);
    }
    console.log('Cliente encontrado:', cliente);
    return cliente;
  }


}
