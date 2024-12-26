import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class SimulacionDto {

  @IsNotEmpty({ message: 'El clienteId es obligatorio' })
  @IsString({ message: 'El clienteId debe ser un texto' })
  clienteId: string;

  @IsNotEmpty({ message: 'El monto es obligatorio' })
  @IsNumber({}, { message: 'El monto debe ser un número' })
  monto: number;

  @IsNotEmpty({ message: 'El plazo es obligatorio' })
  @IsNumber({}, { message: 'El plazo debe ser un número' })
  @IsEnum([12, 24, 36, 48, 60], { message: 'El plazo debe ser de 12, 24, 36, 48 o 60 meses'})
  plazo: number;

}
