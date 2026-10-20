import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { UserService } from './user.service.js';

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

}
