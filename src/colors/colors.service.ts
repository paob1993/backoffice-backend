import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Color, ColorDocument } from './schemas/color.schema';

@Injectable()
export class ColorsService {
  constructor(@InjectModel(Color.name) private brandModel: Model<ColorDocument>) { }
  async findAll(): Promise<Color[]> {
    return this.brandModel.find().exec();
  }
}
