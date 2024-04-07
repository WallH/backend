import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsNotIn, IsNumber, MaxLength } from "class-validator";
import { ETalles } from "src/entities/product.entity";

export abstract class BaseProductDto {
    @ApiProperty()
    @IsNotEmpty()
    @MaxLength(30)
    codigo: string;
    @ApiProperty()
    @IsNotEmpty()
    @MaxLength(100)
    nombre: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    id_categoria: number;
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    precio: number;
    @ApiProperty()
    @IsEnum(ETalles)
    @IsNotEmpty()
    talle: ETalles;
}