import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entity/user.entity.js';
import { Repository } from 'typeorm';
import { createUserDTO } from './dto/user.create.dto.js';

@Injectable()
export class UserService {

    constructor(@InjectRepository(User) private userRepository: Repository<User>) { }

    async getUsers(): Promise<User[]> {
        return await this.userRepository.find({})
    }

    async getUsersByID(id: number): Promise<User | null> {
        const user = await this.userRepository.findOne({
            where: { id },
        });
        if(!user)
            throw new NotFoundException("User with the id not found ")
        return user
    }

    async createUser(createUserDTO:createUserDTO):Promise<User>{
        let u = await this.userRepository.findOne({where:{email:createUserDTO.email}})
        if(u)
            throw new ConflictException("User Already Exists");
        else 
            return await this.userRepository.create(createUserDTO);
    }

}
