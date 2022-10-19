import { Module } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { VehiclesController } from './vehicles.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Vehicle, VehicleSchema } from './schemas/vehicle.schema';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({
    secret: process.env.JWT_KEY,
    signOptions: { expiresIn: '1h' },
  }),
  MongooseModule.forFeature([{ name: Vehicle.name, schema: VehicleSchema }])],
  controllers: [VehiclesController],
  providers: [VehiclesService,]
})
export class VehiclesModule { }
