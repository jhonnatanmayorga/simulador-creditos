import { Injectable } from '@nestjs/common';

@Injectable()
export class ClientesService {
  // Datos simulados para los clientes
  private readonly clientes = [
    { id: '1', nombre: 'Cliente 1', edad: 25, perfil: 'AAA', monto: 10000000 },
    { id: '2', nombre: 'Cliente 2', edad: 45, perfil: 'AA', monto: 20000000 },
    { id: '3', nombre: 'Cliente 3', edad: 65, perfil: 'BAA', monto: 5000000 },
  ];

  // Método para obtener un cliente por su ID
  getCliente(id: string) {
    const cliente = this.clientes.find((c) => c.id === id);
    if (!cliente) {
      throw new Error(`Cliente con ID ${id} no encontrado`);
    }
    return cliente;
  }
}
