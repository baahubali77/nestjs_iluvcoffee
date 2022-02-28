import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, NotFoundException, Param, Patch, Post, Query } from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

@Controller('coffees')
export class CoffeesController {

    //Creating a first GET request
    //path : http://localhost:3000/coffees
    // @Get()
    // findAll() {
    //     return 'First GET Request';
    // }

    //Giving a specific route to a particular request
    //path : http://localhost:3000/coffees/flavours
    // @Get('flavours')
    // findAll() {
    //     return 'Second GET Request with specific route';
    // }

     //Giving a specific route to a particular request
    //path : http://localhost:3000/coffees/id
    // @Get(':id')
    // findOne(@Param() params) {
    //     return `GET Request with dynamic route of ${params.id}`;
    // }

    //  @Get(':id')
    // findOne(@Param('id') id:string ) {
    //     return `GET Request with dynamic route of ${id}`;
    // }

    //@Params : Gives all requested info if nothing specify else give only spcified info
    //@Param() params => Gives object ; params.id gives id element
    //@Param('id') id:string => Gives only id


    // @Post()
    // create(@Body() body) {
    //     return body
    // }

    
    // @Post()
    // @HttpCode(HttpStatus.GONE) //Used to send coustmise status code
    // create(@Body('name') body) {
    //     return body
    // }
    
    // @Patch(':id')
    // update(@Param('id') id: string, @Body() body) {
    //     return `It update the ${id} coffee`
    // }

    //  @Delete(':id')
    // delete(@Param('id') id: string) {
    //     return `It delete the ${id} coffee`
    // }

    
    //Pagination is used to filter or get a particular no of requests to make our request faster
    //path : http://localhost:3000/coffees ; Output : First pagination Request with Limit : undefined and Offfset : undefined
    //path :  http://localhost:3000/coffees?limit=20&offset=10; Output : First pagination Request with Limit : 20 and Offfset : 10
    // @Get()
    // findAll(@Query() paginationQuery) {

    //     const {limit, offset} = paginationQuery
    //     return `First pagination Request with Limit : ${limit} and Offfset : ${offset}`;
    // }

    
    constructor(private readonly coffeeService: CoffeesService) { }
    
      @Get()
    findAll() {
          return this.coffeeService.findAll();
    }

     @Get(':id')
     findOne(@Param('id') id: string) {
         
        //  throw 'A random Error';
         const currCoffee = this.coffeeService.findOne(id);
         
         if (!currCoffee) {
            //  throw new HttpException(`Coffee Not found ${id}`, HttpStatus.NOT_FOUND); 
             throw new NotFoundException(`Coffee Not found ${id}`); 
             
         }

         return currCoffee;
    }

    @Post()
    create(@Body() createCoffeeDto :CreateCoffeeDto) {
           return this.coffeeService.create(createCoffeeDto);
    }


    @Patch(':id')
    update(@Param('id') id: string, @Body() updateCoffeeDto:UpdateCoffeeDto) {
          return this.coffeeService.update(id, updateCoffeeDto);
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
         return this.coffeeService.remove(id);
    }
}
