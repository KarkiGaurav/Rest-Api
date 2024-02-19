import { Body, Controller, Delete, Get, Param, Patch, Post, Query,ParseIntPipe, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user-dto';

import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService){}

    @Get()
    findAll(@Query('role') role?:'INTERN' | 'ENGINEER' | 'ADMIN'){
        // return []
        return this.usersService.findAll(role)
    }

    /* Order is important in the nest if we use this users/inters route after the user/{id} route it will not work proplley. It will se intens as a id  */

    // @Get('interns')
    // findAllInterns(){
    //     return []
    // }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id:number){
        // return {id}
       return this.usersService.findOne(id)
    }

    @Post()
    create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
        // return user;
        return this.usersService.create(createUserDto)
    }

    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) updateUserDto: UpdateUserDto){
        return this.usersService.update(id, updateUserDto)
    }
   
    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number){
       return this.usersService.delete(+id)
    }
}
