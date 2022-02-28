import { Injectable, NotFoundException } from '@nestjs/common';
import { Coffee } from 'src/coffees/entities/coffees.entity';

@Injectable()
export class CoffeesService {

    private coffees: Coffee[] = [{
        id: 1,
        name: 'Nescafe',
    brand: 'Nescafe_brand',
    flavours:['chocolate','vanilla']
    }];

    findAll() {
        return this.coffees
    }

    findOne(id: string) {
        return this.coffees.find(item=>item.id === +id)
    }

    create(createCoffeeDto: any) {
        this.coffees.push(createCoffeeDto)
    }

    update(id: string, updateCoffeeDto: any) {
        const existingCoffee = this.findOne(id)

        if (!existingCoffee) {
            throw new NotFoundException(`Coffee id ${id} Not Found`)
        }

        // existingCoffee
    }

    remove(id: string) {
        const coffeeIndex = this.coffees.findIndex(item => item.id === +id)
        
        if (coffeeIndex >= 0) {
            this.coffees.splice(coffeeIndex,1)
        }
    }
}
