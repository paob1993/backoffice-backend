import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MESSAGES } from '../shared/messages';
import { encryptPassword } from '../shared/encrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import { isMongoId } from 'class-validator';
import { isEmail } from '../shared/validations';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

  async create(user: CreateUserDto): Promise<any> {
    if (!await this.userModel.findOne({ email: user.email }).exec()) {
      user.password = await encryptPassword(user.password);
      await new this.userModel(user).save();
      return {
        message: MESSAGES.USER_CREATED
      }
    }
    throw new HttpException({ error: MESSAGES.USER_EXISTS }, HttpStatus.OK);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const userUpdated = await this.userModel.findByIdAndUpdate({ _id: id }, updateUserDto, { new: true });
    if (userUpdated) {
      return userUpdated;
    }
    throw new HttpException({ error: MESSAGES.UPDATE_ERROR }, HttpStatus.OK);
  }

  async findOne(id: string) {
    if (!isMongoId(id)) {
      const user = this.userModel.findById(id);
      if (user) {
        return user;
      }
      throw new HttpException({ error: MESSAGES.ID_NOT_VALID }, HttpStatus.OK);
    }
    throw new HttpException({ error: MESSAGES.USER_NOT_EXIST }, HttpStatus.OK);
  }

  async findOneByEmail(email: string) {
    if (isEmail(email)) {
      const user = this.userModel.findOne({ email: email });
      if (user) {
        return user;
      }
      throw new HttpException({ error: MESSAGES.USER_NOT_FOUND, }, HttpStatus.OK);
    }
    throw new HttpException({ error: MESSAGES.INVALID_EMAIL_FORMAT }, HttpStatus.BAD_REQUEST);
  }


  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }
}
