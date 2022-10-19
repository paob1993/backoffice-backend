import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { VehiclesModule } from './vehicles/vehicles.module';
import { BrandsModule } from './brands/brands.module';
import { ColorsModule } from './colors/colors.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.HOST_BDD),
    UsersModule,
    AuthModule,
    VehiclesModule,
    BrandsModule,
    ColorsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
