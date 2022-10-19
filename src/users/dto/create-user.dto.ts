import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty({ message: "Nombre requerido" })
    name: string;
    @IsNotEmpty({ message: "Apellido requerido" })
    lastName: string;
    @IsEmail({ message: "Correo requerido" })
    email: string;
    @IsNotEmpty({ message: "Contraseñas requerido" })
    password: string
}
