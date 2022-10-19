import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Brand, BrandDocument } from './schemas/brand.schema';

@Injectable()
export class BrandsService {
  constructor(@InjectModel(Brand.name) private brandModel: Model<BrandDocument>) { }
  async findAll(): Promise<Brand[]> {
    return this.brandModel.find().exec();
  }
}
