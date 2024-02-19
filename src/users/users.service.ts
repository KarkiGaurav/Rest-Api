import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user-dto';

@Injectable()
export class UsersService {
    private users = [
        {
            "id": 1,
            "name": "Darsharn",
            "email": "darshan@email.com",
            "role": "ADMIN"
        },
        {
            "id": 2,
            "name": "Gaurav",
            "email": "Karki@gmail.com",
            "role": "ENGINEER"
        },
        {
            "id": 3,
            "name": "Karki",
            "email": "karki@gmail.com",
            "role": "INTERN"
        },
        {
            "id": 4,
            "name": "Monu",
            "email": "monu@email.com",
            "role": "INTERN"
        },

    ]

    findAll( role?:'INTERN' | 'ENGINEER' | 'ADMIN'){
       if(role){
         const roleArray =  this.users.filter(user => user.role === role)
         if(roleArray.length === 0) throw new NotFoundException('User Role Not Found');
       }

       return this.users
    }

    findOne(id: number){
       const user = this.users.find(user => user.id === id)
       if(!user){
        throw new NotFoundException('user Not Found');
       }
       return user;

    }

    create(createUserDto: CreateUserDto){
        const userId = [...this.users].sort((a,b) => b.id - a.id)

      const newUser = {
        id: userId[0].id + 1,
        ...createUserDto
      }
      
      this.users.push(newUser)
      return newUser
    }


    update(id:number, updateUserDto: UpdateUserDto){
        this.users = this.users.map(user => {
            if(user.id === id) {
                return {...user, ...updateUserDto}
            }
            return user
        })

        return this.findOne(id)
    }

    delete(id: number){
       const removedUser = this.findOne(id)

       this.users = this.users.filter(user => user.id !== id)
       return removedUser
    }
}
