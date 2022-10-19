import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { BrandsService } from './brands.service';

@Controller('brands')
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) { }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.brandsService.findAll();
  }
}
