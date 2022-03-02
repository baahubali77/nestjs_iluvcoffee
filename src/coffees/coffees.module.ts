import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import {Coffee} from './entities/coffees.entity'
import { FlavoursEntity } from './entities/flavours.entity';

@Module({ imports:[TypeOrmModule.forFeature([Coffee, FlavoursEntity])], controllers:[CoffeesController] , providers:[CoffeesService]})
export class CoffeesModule {}
