import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Query } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';

@UseGuards(JwtAuthGuard)
@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) { }

  @Post()
  create(@Request() req: any, @Body() createVehicleDto: CreateVehicleDto,) {
    return this.vehiclesService.create(createVehicleDto, req.headers['authorization']);
  }

  @Get()
  findAllByUserId(@Request() req: any) {
    return this.vehiclesService.findAllByUserId(req.headers['authorization']);
  }

  @Get('/filters')
  filters(@Query('identification') identification: string, @Query('year') year: number, @Request() req: any) {
    return this.vehiclesService.filters({ identification: identification, year: year },  req.headers['authorization']);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vehiclesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVehicleDto: UpdateVehicleDto) {
    return this.vehiclesService.update(id, updateVehicleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vehiclesService.remove(id);
  }
}
