import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';

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
    findOne(@Param('id') id:string){
        // return {id}
       return this.usersService.findOne(+id)
    }

    @Post()
    create(@Body() user: {name: string, email: string, role: 'INTERN' | 'ENGINEER' | 'ADMIN'}) {
        // return user;
        return this.usersService.create(user)
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() userUpdate: {name: string, email?: string, role?: 'INTERN' | 'ENGINEER' | 'ADMIN'}){
        return this.usersService.update(+id, userUpdate)
    }
   
    @Delete(':id')
    delete(@Param('id') id: string){
       return this.usersService.delete(+id)
    }
}
