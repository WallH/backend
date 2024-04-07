import { BadRequestException, Injectable, UseInterceptors } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ValidationError } from 'class-validator';
import { CreateProductDTO } from 'src/controllers/dto/createproduct.dto';
import { UpdateProductDTO } from 'src/controllers/dto/updateproduct.dto';
import { Category } from 'src/entities/category.entity';
import { ETalles, Product } from 'src/entities/product.entity';
import { ApiResponseInterceptor } from 'src/interceptors/apiresponse.interceptor';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {

  constructor(@InjectRepository(Product) private readonly productRepository: Repository<Product>, @InjectRepository(Category) private readonly categoryRepository: Repository<Category>) {}

  async get(): Promise<Product[]>
  {
    return await this.productRepository.find();    
  }

  async getById(id:number): Promise<Product>
  {
    return await this.productRepository.findOneBy({id});
  }

  async getFullByActiveCategories(): Promise<Product[]>
  {
    return await this.productRepository.find({ 
      where:{categoria:{ activa: true}}, relations: ["categoria"]
    });
  }

  async getMediumLarge(): Promise<Product[]>
  {
    return await this.productRepository
      .createQueryBuilder("product")
      .where("product.talle in (:talle)", { talle: [ETalles.MEDIUM, ETalles.LARGE] })
      .getMany();
  }

  async create(productDTO:CreateProductDTO): Promise<Product>
  {
    await this.validateCategory(productDTO.id_categoria); 

    let product = new Product();
    product.codigo = productDTO.codigo;
    product.nombre = productDTO.nombre;
    product.categoria = new Category();
    product.categoria.id = productDTO.id_categoria;
    product.precio = productDTO.precio;
    product.talle = productDTO.talle;
    return await this.productRepository.save(product);
  }

  async delete(id:number): Promise<void>
  {
    const product = await this.productRepository.findOneBy({id});
    if(!product)
    {
      throw new BadRequestException("Product not found");
    }
    await this.productRepository.remove(product);
  }

  async update(id:number, productDTO:UpdateProductDTO): Promise<Product>
  {
    const product = await this.productRepository.findOneBy({id});
    if(!product)
    {
      throw new BadRequestException("Product not found");
    }
    await this.validateCategory(productDTO.id_categoria);
    product.codigo = productDTO.codigo;
    product.nombre = productDTO.nombre;
    product.categoria = new Category();
    product.categoria.id = productDTO.id_categoria;
    product.precio = productDTO.precio;
    product.talle = productDTO.talle;
    return await this.productRepository.save(product);
  }  

  private async validateCategory(id:number)
  {
    const categoryEntity = await this.categoryRepository.findOneBy({id});
    if(!categoryEntity)
    {
      throw new BadRequestException("Category not found");
    }
    return categoryEntity;
  } 
}
