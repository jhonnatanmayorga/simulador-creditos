import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class GetTasaDto {
  @IsNotEmpty({ message: 'El perfil es obligatorio' })
  @IsString({ message: 'El perfil debe ser un texto' })
  perfil: string;

  @IsNotEmpty({ message: 'El monto es obligatorio' })
  @IsNumber({}, { message: 'El monto debe ser un número' })
  monto: number;
}
