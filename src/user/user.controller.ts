import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { UserService } from './user.service.js';
import { User } from '../entity/user.entity.js';
import { createUserDTO } from './dto/user.create.dto.js';

@Controller('user')
export class UserController {

    constructor(private readonly userService:UserService){}

    @Get()
    getUsers(){
        return this.userService.getUsers();
    }
    @Get(':id')
    getUsersById(@Param('id', ParseIntPipe) id:number ){
        return this.userService.getUsersByID(id);
    }

    @Post()
    createUser(@Body() data:createUserDTO):Promise<User>{
     return this.userService.createUser(data)
    }

}
