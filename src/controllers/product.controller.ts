import { Body, Controller, Delete, Get, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { ProductService } from '../services/product.service';
import { ApiResponseInterceptor } from 'src/interceptors/apiresponse.interceptor';
import { Product } from 'src/entities/product.entity';
import { CreateProductDTO } from './dto/createproduct.dto';
import { UpdateProductDTO } from './dto/updateproduct.dto';

@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}


  @Get()
  @UseInterceptors(ApiResponseInterceptor)
  async get() {
    return await this.productService.get();
  }

  @Get(":id")
  @UseInterceptors(ApiResponseInterceptor)
  async getById(@Param('id') id:number) {
    return await this.productService.getById(id);
  }

  @Get("list/activecategory")
  @UseInterceptors(ApiResponseInterceptor)
  async getFullByActiveCategories() {
    return await this.productService.getFullByActiveCategories();
  }

  @Get("list/mediumlarge")
  @UseInterceptors(ApiResponseInterceptor)
  async getMediumLarge() {
    return await this.productService.getMediumLarge();
  }

  @Post()
  @UseInterceptors(ApiResponseInterceptor)
  async post(@Body() productDTO:CreateProductDTO) {

    return await this.productService.create(productDTO);
  }

  @Put(":id")
  @UseInterceptors(ApiResponseInterceptor)
  async put(@Param('id') id:number, @Body() productDTO:UpdateProductDTO) {
    return await this.productService.update(id,productDTO);
  }

  @Delete(":id")
  @UseInterceptors(ApiResponseInterceptor)
  async delete(@Param('id') id:number) {
    return await this.productService.delete(id);
  }
}
