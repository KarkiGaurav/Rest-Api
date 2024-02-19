import { Injectable } from '@nestjs/common';
import { Prisma, Role } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
// import { CreateEmployeeDto } from './dto/create-employee.dto';
// import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Injectable()
export class EmployeesService {
  constructor(private readonly databseService: DatabaseService){}


 async create(createEmployeeDto: Prisma.EmployeeCreateInput) {
    return this.databseService.employee.create({data:createEmployeeDto })
  }

  async findAll(role?: Role) {
   if(role) return this.databseService.employee.findMany({
      where: {
        role,
      }
    })
    return this.databseService.employee.findMany()
  }

  async findOne(id: number) {
    return this.databseService.employee.findUnique({
      where:{
        id,
      }
    })
  }

  async update(id: number, updateEmployeeDto: Prisma.EmployeeUpdateInput) {
    return this.databseService.employee.update({
      where:{
        id,
      },
      data: updateEmployeeDto
    })
  }

  async remove(id: number) {
    return this.databseService.employee.delete({
      where:{
        id,
      }
    })
  }
}
