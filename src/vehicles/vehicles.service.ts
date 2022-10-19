import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isMongoId } from 'class-validator';
import { Model } from 'mongoose';
import { MESSAGES } from '../shared/messages';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { Vehicle, VehicleDocument } from './schemas/vehicle.schema';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class VehiclesService {
  constructor(@InjectModel(Vehicle.name) private vehicleModel: Model<VehicleDocument>, private jwtService: JwtService) { }

  create(createVehicleDto: CreateVehicleDto, authorization: string) {
    createVehicleDto.user = this.getUserFromToken(authorization);
    const createdVehicle = new this.vehicleModel(createVehicleDto);
    return createdVehicle.save();
  }

  async update(id: string, updateVehicleDto: UpdateVehicleDto) {
    const vehicleUpdated = await this.vehicleModel.findByIdAndUpdate({ _id: id }, updateVehicleDto, { new: true });
    if (vehicleUpdated) {
      return vehicleUpdated;
    }
    throw new HttpException({ error: MESSAGES.UPDATE_ERROR }, HttpStatus.OK);
  }

  async findAll(): Promise<Vehicle[]> {
    return this.vehicleModel.find().populate('brand').populate('color').exec();
  }

  async findAllByUserId(authorization: string): Promise<Vehicle[]> {
    return this.vehicleModel.find({ user: this.getUserFromToken(authorization) }).populate('brand').populate('color').exec();
  }

  async findOne(id: string) {
    if (isMongoId(id)) {
      const vehicle = await this.vehicleModel.findById(id).populate('brand').populate('color').exec();
      if (vehicle) {
        return vehicle;
      };
      throw new HttpException({ error: MESSAGES.VEHICLE_NOT_EXIST }, HttpStatus.OK);
    }
    throw new HttpException({ error: MESSAGES.ID_NOT_VALID }, HttpStatus.OK);
  }

  async remove(id: string) {
    if (isMongoId(id)) {
      const vehicle = await this.vehicleModel.findById(id).exec();
      if (vehicle) {
        return await this.vehicleModel.findByIdAndDelete(id);
      };
      throw new HttpException({ error: MESSAGES.VEHICLE_NOT_EXIST }, HttpStatus.OK);
    }
    throw new HttpException({ error: MESSAGES.ID_NOT_VALID }, HttpStatus.OK);
  }

  async filters({ ...filters }, authorization: string): Promise<Vehicle[]> {
    return await this.vehicleModel.find({ ...filters, user: this.getUserFromToken(authorization) }).populate('brand').populate('color').exec();
  }

  getUserFromToken(authorization: string) {
    const token = authorization.replace("Bearer ", "");
    const data = this.jwtService.verify(token);
    return data.user._id;
  }
}
