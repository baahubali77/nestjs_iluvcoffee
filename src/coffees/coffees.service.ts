import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Coffee } from 'src/coffees/entities/coffees.entity';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { Repository } from 'typeorm';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { FlavoursEntity } from './entities/flavours.entity';

@Injectable()
export class CoffeesService {

    // private coffees: Coffee[] = [{
    //     id: 1,
    //     name: 'Nescafe',
    // brand: 'Nescafe_brand',
    // flavours:['chocolate','vanilla']
    // }];

    // findAll() {
    //     return this.coffees
    // }

    // findOne(id: string) {
    //     return this.coffees.find(item=>item.id === +id)
    // }

    // create(createCoffeeDto: any) {
    //     this.coffees.push(createCoffeeDto)
    // }

    // update(id: string, updateCoffeeDto: any) {
    //     const existingCoffee = this.findOne(id)

    //     if (!existingCoffee) {
    //         throw new NotFoundException(`Coffee id ${id} Not Found`)
    //     }

    //     // existingCoffee
    // }

    // remove(id: string) {
    //     const coffeeIndex = this.coffees.findIndex(item => item.id === +id)
        
    //     if (coffeeIndex >= 0) {
    //         this.coffees.splice(coffeeIndex,1)
    //     }
    // }


    constructor(@InjectRepository(Coffee) private readonly coffeeRepository: Repository<Coffee>, @InjectRepository(FlavoursEntity) private readonly flavourRepository: Repository<FlavoursEntity>) { }
    
    findAll(paginationQuery: PaginationQueryDto) {
        
        const { limit, offset } = paginationQuery;
        return this.coffeeRepository.find({
            relations: ['flavours'],
            skip: offset,
            take:limit,
        });
    }

    async findOne(id: string) {
        const coffee = await this.coffeeRepository.findOne(id,{
            relations: ['flavours'],
        });
        
        if (!coffee) {
            throw new NotFoundException(`Coffee ${id} not found`);
        }

        return coffee;
    }

    async create(createCoffeeDto: CreateCoffeeDto) {

        const flavours = await Promise.all(
            createCoffeeDto.flavours.map(item => this.preloadFlavourByName(item)),
        );

        const coffee = this.coffeeRepository.create({
            ...createCoffeeDto,
            flavours
        });
        return this.coffeeRepository.save(coffee);
    }

    async update(id: string, updateCoffeeDto: UpdateCoffeeDto) {

        const flavours = updateCoffeeDto.flavours && (await Promise.all(
            updateCoffeeDto.flavours.map(name=> this.preloadFlavourByName(name)),
        ))

        const coffee = await this.coffeeRepository.preload({
            id: +id,
            ...updateCoffeeDto,
            flavours,
        });

        if (!coffee) {
            throw new NotFoundException(`Coffee id ${id} Not Found`)
        }

        return this.coffeeRepository.save(coffee);
    }

    async remove(id: string) {
        const coffee = await this.findOne(id)
        return this.coffeeRepository.remove(coffee);
    }

    private async preloadFlavourByName(name: string): Promise<FlavoursEntity>{

        const existingFlavour = await this.flavourRepository.findOne({ name });

        if (existingFlavour) {
            return existingFlavour;
        }
        return this.flavourRepository.create({name})
    }
}
