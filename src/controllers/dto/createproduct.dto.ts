import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsNotIn, IsNumber, MaxLength } from "class-validator";
import { ETalles } from "src/entities/product.entity";
import { BaseProductDto } from "./baseproduct.dto";

export class CreateProductDTO extends BaseProductDto
{
}