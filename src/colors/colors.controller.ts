import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ColorsService } from './colors.service';

@Controller('colors')
export class ColorsController {
  constructor(private readonly colorsService: ColorsService) { }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.colorsService.findAll();
  }
}
