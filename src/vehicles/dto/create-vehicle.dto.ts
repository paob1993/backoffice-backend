import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateVehicleDto {
    @IsNotEmpty({ message: "Identificación requerida" })
    identification: string;
    @IsNotEmpty({ message: "Marca requerida" })
    brand: string;
    @IsNumber()
    @IsNotEmpty({ message: "Año requerido" })
    year: number;
    @IsNotEmpty({ message: "Color requerido" })
    color: string;
    @IsNotEmpty({ message: "Fecha ingreso requerido" })
    date: Date;
    user: string;
    image: string;
    status: boolean;
    assigned: boolean;
}
